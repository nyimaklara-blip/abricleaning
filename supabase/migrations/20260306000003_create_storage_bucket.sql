-- Create public storage bucket for site images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-images',
  'site-images',
  true,
  10485760, -- 10 MB per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Anyone can view images (public bucket)
CREATE POLICY "Public read site images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-images');

-- Only authenticated admin can upload
CREATE POLICY "Admin insert site images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-images');

-- Only authenticated admin can replace
CREATE POLICY "Admin update site images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-images');

-- Only authenticated admin can delete
CREATE POLICY "Admin delete site images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-images');
