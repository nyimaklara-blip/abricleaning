-- Create the site content table
CREATE TABLE IF NOT EXISTS site_content (
  id   int PRIMARY KEY,
  data jsonb NOT NULL
);

-- Enable Row Level Security
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Anyone (anon) can read
CREATE POLICY "Public read"
  ON site_content
  FOR SELECT
  USING (true);

-- Only authenticated users (admin) can update
CREATE POLICY "Admin update"
  ON site_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
