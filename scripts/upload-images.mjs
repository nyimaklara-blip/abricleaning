// Uploads the current static site images to Supabase Storage
// and patches the site_content row with their public URLs.
// Run once: node scripts/upload-images.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const ASSETS = resolve(ROOT, "src/assets");

const SUPABASE_URL = "https://vvlolbkxutwyvcpbijcv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_9sm8o22JjJa4mtjz1gdw-Q_fv96-dhl";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── 1. Log in as admin ───────────────────────────────────────────────────────
const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
  email: "n.karamo@protonmail.com",
  password: "abricleaning",
});
if (authErr) { console.error("Login failed:", authErr.message); process.exit(1); }
console.log("✓ Logged in as", authData.user.email);

// ── 2. Upload helper ─────────────────────────────────────────────────────────
async function upload(localFile, storagePath, mimeType) {
  const bytes = readFileSync(resolve(ASSETS, localFile));
  const { error } = await supabase.storage
    .from("site-images")
    .upload(storagePath, bytes, { contentType: mimeType, upsert: true });
  if (error) throw new Error(`Upload ${localFile}: ${error.message}`);
  const { data } = supabase.storage.from("site-images").getPublicUrl(storagePath);
  console.log("✓ Uploaded", storagePath, "→", data.publicUrl);
  return data.publicUrl;
}

// ── 3. Upload all images ─────────────────────────────────────────────────────
const [logo, hero1, hero2, hero3, portrait, dreamTeam] = await Promise.all([
  upload("abricleaning-logo.png", "logo/abricleaning-logo.png",   "image/png"),
  upload("hero-1.jpg",            "hero/hero-1.jpg",               "image/jpeg"),
  upload("hero-2.jpg",            "hero/hero-2.jpg",               "image/jpeg"),
  upload("hero-3.jpg",            "hero/hero-3.jpg",               "image/jpeg"),
  upload("christa-portrait.jpg",  "portrait/christa-portrait.jpg", "image/jpeg"),
  upload("dream-team-products.jpg","dreamteam/dream-team-products.jpg","image/jpeg"),
]);

// ── 4. Fetch current content row ─────────────────────────────────────────────
const { data: row, error: fetchErr } = await supabase
  .from("site_content")
  .select("data")
  .eq("id", 1)
  .single();
if (fetchErr) { console.error("Fetch failed:", fetchErr.message); process.exit(1); }

// ── 5. Patch images section ──────────────────────────────────────────────────
const updated = {
  ...row.data,
  images: {
    logo,
    hero: [hero1, hero2, hero3],
    christaPortrait: portrait,
    dreamTeam,
  },
};

const { error: saveErr } = await supabase
  .from("site_content")
  .update({ data: updated })
  .eq("id", 1);
if (saveErr) { console.error("Save failed:", saveErr.message); process.exit(1); }

console.log("\n✅ Done — site_content updated with Supabase Storage URLs.");
