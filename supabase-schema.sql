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
