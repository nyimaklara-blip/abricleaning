import type { VercelRequest, VercelResponse } from "@vercel/node";

const FILE_PATH = "public/data/reviews.json";
const AVATAR_DIR = "public/uploads/avatars";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

interface Review {
  id: string;
  name: string;
  location?: string;
  rating: number;
  text: string;
  date: string;
  avatarUrl?: string;
}

const recentSubmissions = new Map<string, number>();
const RATE_WINDOW_MS = 5 * 60 * 1000;

function getClientIp(req: VercelRequest): string {
  const forwarded = (req.headers["x-forwarded-for"] as string) || "";
  return forwarded.split(",")[0].trim() || (req.socket?.remoteAddress ?? "unknown");
}

function sanitize(input: unknown, maxLen: number): string {
  return String(input ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim()
    .slice(0, maxLen);
}

interface AvatarUpload {
  buffer: Buffer;
  ext: string;
}

function parseAvatarDataUrl(dataUrl: string): AvatarUpload | null {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  const mime = match[1].toLowerCase();
  if (!ALLOWED_MIME.has(mime)) return null;
  const buffer = Buffer.from(match[2], "base64");
  if (buffer.length > MAX_AVATAR_BYTES) return null;
  return { buffer, ext: MIME_TO_EXT[mime] };
}

async function triggerVercelDeploy(): Promise<void> {
  // Triggers a Vercel redeploy if VERCEL_DEPLOY_HOOK is configured.
  // Requires the project to be linked to GitHub in Vercel settings.
  const hook = process.env.VERCEL_DEPLOY_HOOK;
  if (!hook) return;
  await fetch(hook, { method: "POST" });
}

async function uploadAvatar(
  ghHeaders: Record<string, string>,
  owner: string,
  repo: string,
  branch: string,
  reviewId: string,
  avatar: AvatarUpload,
  authorName: string
): Promise<string | null> {
  const filename = `${reviewId}.${avatar.ext}`;
  const path = `${AVATAR_DIR}/${filename}`;

  const resp = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: ghHeaders,
    body: JSON.stringify({
      message: `feat(reviews): avatar for ${authorName}`,
      content: avatar.buffer.toString("base64"),
      branch,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    console.error("Avatar upload failed:", resp.status, err);
    return null;
  }

  return `/uploads/avatars/${filename}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || "nyimaklara-blip";
  const repo = process.env.GITHUB_REPO || "abricleaning";
  const branch = process.env.GITHUB_BRANCH || "master";

  if (!token) {
    return res.status(500).json({ error: "Server not configured (missing GITHUB_TOKEN)" });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  if (body.website) return res.status(200).json({ ok: true, skipped: true });

  const name = sanitize(body.name, 80);
  const location = sanitize(body.location, 80);
  const text = sanitize(body.text, 1000);
  const rating = Math.max(1, Math.min(5, Math.round(Number(body.rating) || 0)));

  if (!name || !text || rating < 1) {
    return res.status(400).json({ error: "Bitte füllen Sie alle Pflichtfelder aus." });
  }

  if (text.length < 10) {
    return res.status(400).json({ error: "Bitte schreiben Sie mindestens 10 Zeichen." });
  }

  // Validate avatar early if present
  let avatar: AvatarUpload | null = null;
  if (typeof body.avatarDataUrl === "string" && body.avatarDataUrl.length > 0) {
    avatar = parseAvatarDataUrl(body.avatarDataUrl);
    if (!avatar) {
      return res
        .status(400)
        .json({ error: "Ungültiges Profilbild. Nur JPG/PNG/WebP, max. 2 MB." });
    }
  }

  // Rate limit
  const ip = getClientIp(req);
  const now = Date.now();
  for (const [key, ts] of recentSubmissions.entries()) {
    if (now - ts > RATE_WINDOW_MS) recentSubmissions.delete(key);
  }
  if (recentSubmissions.has(ip)) {
    return res.status(429).json({
      error: "Bitte warten Sie ein paar Minuten, bevor Sie eine weitere Bewertung senden.",
    });
  }

  try {
    const ghHeaders: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    // Read current reviews.json
    const fileResp = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${FILE_PATH}?ref=${branch}`,
      { headers: ghHeaders }
    );

    if (!fileResp.ok) {
      const err = await fileResp.text();
      console.error("Fetch reviews.json failed:", fileResp.status, err);
      return res.status(500).json({ error: "Konnte aktuelle Bewertungen nicht laden." });
    }

    const fileData = (await fileResp.json()) as { content: string; sha: string };
    const decoded = Buffer.from(fileData.content, "base64").toString("utf-8");
    let reviews: Review[];
    try {
      reviews = JSON.parse(decoded);
      if (!Array.isArray(reviews)) reviews = [];
    } catch {
      reviews = [];
    }

    const reviewId = `r-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // Upload avatar first if present
    let avatarUrl = "";
    if (avatar) {
      const uploaded = await uploadAvatar(ghHeaders, owner, repo, branch, reviewId, avatar, name);
      if (!uploaded) {
        return res.status(500).json({ error: "Konnte Profilbild nicht hochladen." });
      }
      avatarUrl = uploaded;
    }

    const newReview: Review = {
      id: reviewId,
      name,
      location: location || undefined,
      rating,
      text,
      date: new Date().toISOString(),
      avatarUrl: avatarUrl || undefined,
    };

    const updated = [newReview, ...reviews];

    // Commit reviews.json
    const commitResp = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${FILE_PATH}`,
      {
        method: "PUT",
        headers: ghHeaders,
        body: JSON.stringify({
          message: `feat(reviews): new review from ${name}`,
          content: Buffer.from(JSON.stringify(updated, null, 2) + "\n").toString("base64"),
          sha: fileData.sha,
          branch,
        }),
      }
    );

    if (!commitResp.ok) {
      const err = await commitResp.text();
      console.error("Commit failed:", commitResp.status, err);
      return res.status(500).json({ error: "Konnte Bewertung nicht speichern." });
    }

    recentSubmissions.set(ip, now);

    // Trigger Vercel redeploy so the new review/avatar are picked up
    await triggerVercelDeploy().catch((e) =>
      console.error("Vercel redeploy trigger failed (review still committed):", e)
    );

    return res.status(200).json({ ok: true, review: newReview });
  } catch (err) {
    console.error("Review API error:", err);
    return res.status(500).json({ error: "Unerwarteter Fehler. Bitte versuchen Sie es später erneut." });
  }
}
