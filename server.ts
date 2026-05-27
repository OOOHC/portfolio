import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";

// --- Supabase client (server-side, uses env vars) ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null;

function getSupabaseClient(res: express.Response) {
  if (!supabase) {
    res.status(500).json({
      error: "Server is missing Supabase env vars: SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY",
    });
    return null;
  }
  return supabase;
}

const DEFAULT_POSTS = [
  {
    id: "1",
    date: "OCT 24, 2024",
    title: "Exploring the Future of Generative AI",
    description: "Diving deep into the implications of large language models on creative workflows and technical problem-solving. How can we ensure these tools augment human potential effectively?",
    link: "#"
  },
  {
    id: "2",
    date: "OCT 12, 2024",
    title: "My Journey into Robotics",
    description: "Reflecting on the challenges of bridging the gap between abstract algorithms and physical hardware. A look into the assembly and navigation of my first mobile robot.",
    link: "#"
  },
  {
    id: "3",
    date: "SEP 18, 2024",
    title: "Optimizing Neural Networks",
    description: "Practical strategies for achieving high performance when working with limited datasets. Focus on data augmentation and transfer learning techniques in computer vision.",
    link: "#"
  }
];

const DATA_DIR = path.join(process.cwd(), "data");
const BLOGS_FILE = path.join(DATA_DIR, "blogs.json");

async function getBlogs() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const data = await fs.readFile(BLOGS_FILE, "utf-8");
      return JSON.parse(data);
    } catch {
      await fs.writeFile(BLOGS_FILE, JSON.stringify(DEFAULT_POSTS, null, 2), "utf-8");
      return DEFAULT_POSTS;
    }
  } catch (error) {
    console.error("Error reading blogs database:", error);
    return DEFAULT_POSTS;
  }
}

async function saveBlogs(blogs: any) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving blogs database:", error);
    return false;
  }
}

const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");

const DEFAULT_PROJECTS = [
  {
    id: "1",
    category: "INTRODUCTION TO ROBOTICS",
    title: "Mobile Robot Assembly & Navigation",
    description: "Assembled a four-wheel mobile robot with Arduino, implementing Python-based navigation algorithms for obstacle avoidance and goal tracking. Achieved high-precision sensing and documented full system performance.",
    link: "projects/Robotics Lab Report_HeLingling.pdf",
    type: "VIEW PROJECT",
    draft: false
  },
  {
    id: "2",
    category: "OBJECT-ORIENTED PROGRAMMING",
    title: "Horse Racing Simulator",
    description: "Developed a Java-based simulator utilizing OOP principles: encapsulation, inheritance, polymorphism. Built an interactive Swing GUI for real-time race tracking and horse statistics.",
    link: "https://github.com/OOOHC/HorseRaceSimulator",
    type: "VIEW PROJECT",
    draft: false
  },
  {
    id: "3",
    category: "GAME DESIGN",
    title: "Hunt the Boggle Monster",
    description: "A maze exploration game concept where players collect magical objects and use powers.",
    link: "projects/Level 5 mini project-Copy3.pdf",
    type: "OPEN PDF",
    draft: false
  },
  {
    id: "4",
    category: "SOFTWARE SPECIFICATION",
    title: "Messaging App Specification",
    description: "Defining requirements, interactions, and system behavior for a messaging platform.",
    link: "projects/Group1.8_ECS427U_assignment3.pdf",
    type: "OPEN PDF",
    draft: false
  },
  {
    id: "5",
    category: "RESEARCH PRESENTATION",
    title: "Responsible Technology",
    description: "Exploring responsible technology decisions and sustainability in modern computing.",
    link: "projects/Responsible & Sustainable Presentation.pdf",
    type: "OPEN PDF",
    draft: false
  }
];

async function getProjects() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const data = await fs.readFile(PROJECTS_FILE, "utf-8");
      return JSON.parse(data);
    } catch {
      await fs.writeFile(PROJECTS_FILE, JSON.stringify(DEFAULT_PROJECTS, null, 2), "utf-8");
      return DEFAULT_PROJECTS;
    }
  } catch (error) {
    console.error("Error reading projects database:", error);
    return DEFAULT_PROJECTS;
  }
}

async function saveProjects(projects: any) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving projects database:", error);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Auth middleware: verify Supabase JWT token ---
  const requireAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const client = getSupabaseClient(res);
    if (!client) {
      return;
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.replace("Bearer ", "");
    const { data, error } = await client.auth.getUser(token);
    if (error || !data.user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    next();
  };

  //--- API ROUTES ---

  // Auth: Login with Supabase
  app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username/email and password are required" });
    }
    const client = getSupabaseClient(res);
    if (!client) {
      return;
    }
    // username can be email or "admin" (map to the actual email)
    const email = username === "admin" ? process.env.ADMIN_EMAIL : username;
    if (username === "admin" && !email) {
      return res.status(500).json({ error: "Server is missing ADMIN_EMAIL" });
    }
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error || !data.session) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.json({
      token: data.session.access_token,
      username: data.user.email
    });
  });

  // Auth: Check status
  app.get("/api/auth/me", async (req, res) => {
    const client = getSupabaseClient(res);
    if (!client) {
      return;
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ authenticated: false });
    }
    const token = authHeader.replace("Bearer ", "");
    const { data, error } = await client.auth.getUser(token);
    if (error || !data.user) {
      return res.json({ authenticated: false });
    }
    res.json({ authenticated: true, username: data.user.email?.replace(/@.*/, '') });
  });

  // Get all blogs
  app.get("/api/blogs", async (req, res) => {
    const blogs = await getBlogs();
    res.json(blogs);
  });

  // Add a blog
  app.post("/api/blogs", requireAuth, async (req, res) => {
    const { title, description, link, draft } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }
    const blogs = await getBlogs();
    const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    }).toUpperCase();
    const newBlog = {
      id: Date.now().toString(),
      date: formattedDate,
      title,
      description,
      link: link || "#",
      draft: !!draft
    };
    blogs.unshift(newBlog);
    const success = await saveBlogs(blogs);
    if (success) {
      res.status(201).json(newBlog);
    } else {
      res.status(500).json({ error: "Failed to persist blog post" });
    }
  });

  // Edit a blog
  app.put("/api/blogs/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    const { title, description, link, draft } = req.body;
    const blogs = await getBlogs();
    const idx = blogs.findIndex((b: any) => b.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    blogs[idx] = {
      ...blogs[idx],
      title: title || blogs[idx].title,
      description: description || blogs[idx].description,
      link: link || blogs[idx].link,
      draft: draft !== undefined ? !!draft : blogs[idx].draft
    };
    const success = await saveBlogs(blogs);
    if (success) {
      res.json(blogs[idx]);
    } else {
      res.status(500).json({ error: "Failed to save blog post" });
    }
  });

  // Delete a blog
  app.delete("/api/blogs/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    const blogs = await getBlogs();
    const filteredBlogs = blogs.filter((b: any) => b.id !== id);
    if (filteredBlogs.length === blogs.length) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    const success = await saveBlogs(filteredBlogs);
    if (success) {
      res.json({ message: "Successfully deleted blog post" });
    } else {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // Get all projects
  app.get("/api/projects", async (req, res) => {
    const projects = await getProjects();
    res.json(projects);
  });

  // Add a project
  app.post("/api/projects", requireAuth, async (req, res) => {
    const { category, title, description, link, type, draft } = req.body;
    if (!category || !title || !description) {
      return res.status(400).json({ error: "Category, title, and description are required" });
    }
    const projects = await getProjects();
    const newProject = {
      id: Date.now().toString(),
      category,
      title,
      description,
      link: link || "#",
      type: type || "VIEW PROJECT",
      draft: !!draft
    };
    projects.unshift(newProject);
    const success = await saveProjects(projects);
    if (success) {
      res.status(201).json(newProject);
    } else {
      res.status(500).json({ error: "Failed to persist project" });
    }
  });

  // Edit a project
  app.put("/api/projects/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    const { category, title, description, link, type, draft } = req.body;
    const projects = await getProjects();
    const idx = projects.findIndex((p: any) => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: "Project not found" });
    }
    projects[idx] = {
      ...projects[idx],
      category: category || projects[idx].category,
      title: title || projects[idx].title,
      description: description || projects[idx].description,
      link: link || projects[idx].link,
      type: type || projects[idx].type,
      draft: draft !== undefined ? !!draft : projects[idx].draft
    };
    const success = await saveProjects(projects);
    if (success) {
      res.json(projects[idx]);
    } else {
      res.status(500).json({ error: "Failed to save project" });
    }
  });

  // Delete a project
  app.delete("/api/projects/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    const projects = await getProjects();
    const filteredProjects = projects.filter((p: any) => p.id !== id);
    if (filteredProjects.length === projects.length) {
      return res.status(404).json({ error: "Project not found" });
    }
    const success = await saveProjects(filteredProjects);
    if (success) {
      res.json({ message: "Successfully deleted project" });
    } else {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  //--- VITE / STATIC MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
  return app;
}

const appPromise = startServer();
export default async (req: any, res: any) => {
  const app = await appPromise;
  return app(req, res);
};