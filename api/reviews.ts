import type { VercelRequest, VercelResponse } from "@vercel/node";

const FILE_PATH = "public/data/reviews.json";

interface Review {
  id: string;
  name: string;
  location?: string;
  rating: number;
  text: string;
  date: string;
}

const recentSubmissions = new Map<string, number>();
const RATE_WINDOW_MS = 5 * 60 * 1000; // 5 min

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — allow same-origin only by default
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

  // Honeypot
  if (body.website) {
    return res.status(200).json({ ok: true, skipped: true });
  }

  // Validation
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

  // Rate limit: 1 review per IP per 5 minutes
  const ip = getClientIp(req);
  const now = Date.now();
  for (const [key, ts] of recentSubmissions.entries()) {
    if (now - ts > RATE_WINDOW_MS) recentSubmissions.delete(key);
  }
  if (recentSubmissions.has(ip)) {
    return res.status(429).json({ error: "Bitte warten Sie ein paar Minuten, bevor Sie eine weitere Bewertung senden." });
  }

  try {
    // Get current reviews.json
    const ghHeaders: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

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

    // Build new review (newest first)
    const newReview: Review = {
      id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      location: location || undefined,
      rating,
      text,
      date: new Date().toISOString(),
    };

    const updated = [newReview, ...reviews];

    // Commit back
    const commitResp = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${FILE_PATH}`,
      {
        method: "PUT",
        headers: ghHeaders,
        body: JSON.stringify({
          message: `feat(reviews): new review from ${name}`,
          content: Buffer.from(JSON.stringify(updated, null, 2)).toString("base64"),
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
    return res.status(200).json({ ok: true, review: newReview });
  } catch (err) {
    console.error("Review API error:", err);
    return res.status(500).json({ error: "Unerwarteter Fehler. Bitte versuchen Sie es später erneut." });
  }
}
