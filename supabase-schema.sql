-- Supabase schema for portfolio

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id text PRIMARY KEY,
  date text,
  title text NOT NULL,
  description text NOT NULL,
  link text,
  draft boolean DEFAULT false,
  inserted_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id text PRIMARY KEY,
  category text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  link text,
  type text,
  draft boolean DEFAULT false,
  inserted_at timestamptz DEFAULT now()
);

-- Experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id text PRIMARY KEY,
  title text NOT NULL,
  role text NOT NULL,
  period text,
  type text NOT NULL,
  icon_key text NOT NULL,
  bullets jsonb NOT NULL DEFAULT '[]'::jsonb,
  draft boolean DEFAULT false,
  inserted_at timestamptz DEFAULT now()
);

-- Resume settings table
CREATE TABLE IF NOT EXISTS resume_settings (
  id text PRIMARY KEY,
  url text NOT NULL,
  inserted_at timestamptz DEFAULT now()
);
