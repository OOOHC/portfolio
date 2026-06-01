import express from "express";
import path from "path";
import fs from "fs/promises";
// `vite` is only needed in local dev middleware. Import it dynamically
// inside the dev-only branch to avoid initializing Vite in serverless environments.
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
const EXPERIENCES_FILE = path.join(DATA_DIR, "experiences.json");
const RESUME_FILE = path.join(DATA_DIR, "resume.json");

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
    link: "/projects/Robotics Lab Report_HeLingling.pdf",
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
    link: "/projects/Level 5 mini project-Copy3.pdf",
    type: "OPEN PDF",
    draft: false
  },
  {
    id: "4",
    category: "SOFTWARE SPECIFICATION",
    title: "Messaging App Specification",
    description: "Defining requirements, interactions, and system behavior for a messaging platform.",
    link: "/projects/Group1.8_ECS427U_assignment3.pdf",
    type: "OPEN PDF",
    draft: false
  },
  {
    id: "5",
    category: "RESEARCH PRESENTATION",
    title: "Responsible Technology",
    description: "Exploring responsible technology decisions and sustainability in modern computing.",
    link: "/projects/Responsible & Sustainable Presentation.pdf",
    type: "OPEN PDF",
    draft: false
  }
];

const DEFAULT_EXPERIENCES = [
  {
    id: "work-1",
    title: "T4",
    role: "Boba Barista",
    period: "Mar 2025",
    type: "work",
    iconKey: "cpu",
    bullets: [
      "Collaborated with team members during peak periods to support efficient operations",
      "Prepared and served Urber Eats deliveries",
      "Maintained high quality hygiene and safety standards"
    ],
    draft: false
  },
  {
    id: "vol-1",
    title: "World Table Tennis London 2026",
    role: "FAN ZONE ACTIVATOR, MEDIA ASSISTANT, ANTI-DOPING ASSISTANT",
    period: "MAY 2026",
    type: "voluntary",
    iconKey: "briefcase",
    bullets: [
      "Supported the setup and operation of the fan engagement zone, ensuring a smooth and engaging visitor experience",
      "Coordinated with media personnel and publishers to facilitate efficient content distribution and event coverage",
      "Assisted in the implementation of anti-doping procedures, maintaining compliance with official regulations and protocols"
    ],
    draft: false
  },
  {
    id: "vol-2",
    title: "Chinese New Year & Lantern Festival",
    role: "EVENT PHOTOGRAPHER",
    period: "FEB, MAR 2026",
    type: "voluntary",
    iconKey: "camera",
    bullets: [
      "Captured high-quality event photography featured on official organiser media channels and People's Daily Online"
    ],
    draft: false
  },
  {
    id: "vol-3",
    title: "Thames Hospice",
    role: "RETAIL VOLUNTEER",
    period: "Feb 2024",
    type: "voluntary",
    iconKey: "heart",
    bullets: [
      "Welcomed and assisted customers in a professional environment.",
      "Shared charity information and encouraged community support.",
      "Restocked and presented the shop floor."
    ],
    draft: false
  },
  {
    id: "vol-4",
    title: "Barnardo's",
    role: "RETAIL VOLUNTEER",
    period: "Feb 2023",
    type: "voluntary",
    iconKey: "heart",
    bullets: [
      "Sorted and organised donated items for sale.",
      "Personalised assistance for customers finding items."
    ],
    draft: false
  },
  {
    id: "vol-5",
    title: "British Heart Foundation",
    role: "RETAIL VOLUNTEER",
    period: "Feb 2022",
    type: "voluntary",
    iconKey: "heart",
    bullets: [
      "Responded to questions and supported daily retail operations."
    ],
    draft: false
  }
];

const DEFAULT_RESUME = { id: "resume", url: "/resume.pdf" };

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

async function getExperiences() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const data = await fs.readFile(EXPERIENCES_FILE, "utf-8");
      return JSON.parse(data);
    } catch {
      await fs.writeFile(EXPERIENCES_FILE, JSON.stringify(DEFAULT_EXPERIENCES, null, 2), "utf-8");
      return DEFAULT_EXPERIENCES;
    }
  } catch (error) {
    console.error("Error reading experiences database:", error);
    return DEFAULT_EXPERIENCES;
  }
}

async function saveExperiences(experiences: any) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(EXPERIENCES_FILE, JSON.stringify(experiences, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving experiences database:", error);
    return false;
  }
}

async function getResumeSettings() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const data = await fs.readFile(RESUME_FILE, "utf-8");
      return JSON.parse(data);
    } catch {
      await fs.writeFile(RESUME_FILE, JSON.stringify(DEFAULT_RESUME, null, 2), "utf-8");
      return DEFAULT_RESUME;
    }
  } catch (error) {
    console.error("Error reading resume database:", error);
    return DEFAULT_RESUME;
  }
}

async function saveResumeSettings(resume: any) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(RESUME_FILE, JSON.stringify(resume, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving resume database:", error);
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

  // Health: confirm the serverless function is reachable and configuration is present.
  app.get("/api/health", async (req, res) => {
    res.json({
      ok: true,
      timestamp: new Date().toISOString(),
      supabaseConfigured: Boolean(supabase),
      adminEmailConfigured: Boolean(process.env.ADMIN_EMAIL),
    });
  });

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
    if (supabase) {
      try {
        const { data, error } = await supabase.from('blogs').select('*').order('id', { ascending: false });
        if (error) throw error;
        return res.json(data || []);
      } catch (e) {
        console.error('Supabase fetch blogs error, falling back to local file:', e);
      }
    }
    const blogs = await getBlogs();
    res.json(blogs);
  });

  // Add a blog
  app.post("/api/blogs", requireAuth, async (req, res) => {
    const { title, description, link, draft, published_at } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }
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
    if (supabase) {
      try {
        const { data, error } = await supabase.from('blogs').insert([newBlog]).select();
        if (error) {
          console.error('Supabase insert blog error:', error);
          return res.status(500).json({ error: error.message || String(error) });
        }
        return res.status(201).json((data && data[0]) || newBlog);
      } catch (e: any) {
        console.error('Supabase insert blog unexpected error:', e);
        return res.status(500).json({ error: e.message || String(e) });
      }
    }
    // Fallback to local file storage only when Supabase is not configured
    const blogs = await getBlogs();
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
    const { title, description, link, draft, published_at } = req.body;
    if (supabase) {
      try {
        const updates: any = {};
        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (link !== undefined) updates.link = link;
        if (draft !== undefined) updates.draft = !!draft;
        const { data, error } = await supabase.from('blogs').update(updates).eq('id', id).select();
        if (error) {
          console.error('Supabase update blog error:', error);
          return res.status(500).json({ error: error.message || String(error) });
        }
        if (!data || data.length === 0) return res.status(404).json({ error: 'Blog post not found' });
        return res.json(data[0]);
      } catch (e: any) {
        console.error('Supabase update blog unexpected error:', e);
        return res.status(500).json({ error: e.message || String(e) });
      }
    }
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
    if (supabase) {
      try {
        const { data, error } = await supabase.from('blogs').delete().eq('id', id).select();
        if (error) {
          console.error('Supabase delete blog error:', error);
          return res.status(500).json({ error: error.message || String(error) });
        }
        if (!data || data.length === 0) return res.status(404).json({ error: 'Blog post not found' });
        return res.json({ message: 'Successfully deleted blog post' });
      } catch (e: any) {
        console.error('Supabase delete blog unexpected error:', e);
        return res.status(500).json({ error: e.message || String(e) });
      }
    }
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
    if (supabase) {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: false });
        if (error) {
          console.error('Supabase fetch projects error:', error);
          return res.status(500).json({ error: error.message || String(error) });
        }
        return res.json(data || []);
      } catch (e: any) {
        console.error('Supabase fetch projects unexpected error:', e);
        return res.status(500).json({ error: e.message || String(e) });
      }
    }
    const projects = await getProjects();
    res.json(projects);
  });

  // Add a project
  app.post("/api/projects", requireAuth, async (req, res) => {
    const { category, title, description, link, type, draft, published_at } = req.body;
    if (!category || !title || !description) {
      return res.status(400).json({ error: "Category, title, and description are required" });
    }
    const newProject = {
      id: Date.now().toString(),
      category,
      title,
      description,
      link: link || "#",
      type: type || "VIEW PROJECT",
      draft: !!draft
    };
    if (supabase) {
      try {
        const { data, error } = await supabase.from('projects').insert([newProject]).select();
        if (error) {
          console.error('Supabase insert project error:', error);
          return res.status(500).json({ error: error.message || String(error) });
        }
        return res.status(201).json((data && data[0]) || newProject);
      } catch (e: any) {
        console.error('Supabase insert project unexpected error:', e);
        return res.status(500).json({ error: e.message || String(e) });
      }
    }
    const projects = await getProjects();
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
    if (supabase) {
      try {
        const updates: any = {};
        if (category !== undefined) updates.category = category;
        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (link !== undefined) updates.link = link;
        if (type !== undefined) updates.type = type;
        if (draft !== undefined) updates.draft = !!draft;
        const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select();
        if (error) {
          console.error('Supabase update project error:', error);
          return res.status(500).json({ error: error.message || String(error) });
        }
        if (!data || data.length === 0) return res.status(404).json({ error: 'Project not found' });
        return res.json(data[0]);
      } catch (e: any) {
        console.error('Supabase update project unexpected error:', e);
        return res.status(500).json({ error: e.message || String(e) });
      }
    }
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
    if (supabase) {
      try {
        const { data, error } = await supabase.from('projects').delete().eq('id', id).select();
        if (error) {
          console.error('Supabase delete project error:', error);
          return res.status(500).json({ error: error.message || String(error) });
        }
        if (!data || data.length === 0) return res.status(404).json({ error: 'Project not found' });
        return res.json({ message: 'Successfully deleted project' });
      } catch (e: any) {
        console.error('Supabase delete project unexpected error:', e);
        return res.status(500).json({ error: e.message || String(e) });
      }
    }
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

  // Get all experiences
  app.get("/api/experiences", async (req, res) => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('experiences').select('*').order('inserted_at', { ascending: false });
        if (error) {
          console.error('Supabase fetch experiences error:', error);
          return res.status(500).json({ error: error.message || String(error) });
        }
        return res.json((data || []).map((experience: any) => ({
          id: experience.id,
          title: experience.title,
          role: experience.role,
          period: experience.period,
          type: experience.type,
          iconKey: experience.icon_key || experience.iconKey || 'briefcase',
          bullets: experience.bullets || [],
          draft: !!experience.draft
        })));
      } catch (e: any) {
        console.error('Supabase fetch experiences unexpected error:', e);
      }
    }
    const experiences = await getExperiences();
    res.json(experiences);
  });

  // Add an experience
  app.post("/api/experiences", requireAuth, async (req, res) => {
    const { title, role, period, type, iconKey, bullets, draft, inserted_at } = req.body;
    if (!title || !role || !Array.isArray(bullets) || bullets.length === 0) {
      return res.status(400).json({ error: "Title, role, and bullets are required" });
    }
    const newExperience = {
      id: Date.now().toString(),
      title,
      role,
      period: period || "",
      type: type || "work",
      iconKey: iconKey || "briefcase",
      bullets,
      draft: !!draft
    };
    if (supabase) {
      try {
        const payload = {
          ...newExperience,
          icon_key: newExperience.iconKey
        };
        const { data, error } = await supabase.from('experiences').insert([payload]).select();
        if (error) {
          console.error('Supabase insert experience error:', error);
          return res.status(500).json({ error: error.message || String(error) });
        }
        const row = (data && data[0]) || payload;
        return res.status(201).json({
          id: row.id,
          title: row.title,
          role: row.role,
          period: row.period,
          type: row.type,
          iconKey: row.icon_key || row.iconKey || 'briefcase',
          bullets: row.bullets || [],
          draft: !!row.draft
        });
      } catch (e: any) {
        console.error('Supabase insert experience unexpected error:', e);
        return res.status(500).json({ error: e.message || String(e) });
      }
    }
    const experiences = await getExperiences();
    experiences.unshift(newExperience);
    const success = await saveExperiences(experiences);
    if (success) {
      res.status(201).json(newExperience);
    } else {
      res.status(500).json({ error: "Failed to persist experience" });
    }
  });

  // Edit an experience
  app.put("/api/experiences/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    const { title, role, period, type, iconKey, bullets, draft, inserted_at } = req.body;
    if (supabase) {
      try {
        const updates: any = {};
        if (title !== undefined) updates.title = title;
        if (role !== undefined) updates.role = role;
        if (period !== undefined) updates.period = period;
        if (type !== undefined) updates.type = type;
        if (iconKey !== undefined) updates.icon_key = iconKey;
        if (bullets !== undefined) updates.bullets = bullets;
        if (draft !== undefined) updates.draft = !!draft;
        if (inserted_at !== undefined) updates.inserted_at = inserted_at;
        const { data, error } = await supabase.from('experiences').update(updates).eq('id', id).select();
        if (error) {
          console.error('Supabase update experience error:', error);
          return res.status(500).json({ error: error.message || String(error) });
        }
        if (!data || data.length === 0) return res.status(404).json({ error: 'Experience not found' });
        const row = data[0] as any;
        return res.json({
          id: row.id,
          title: row.title,
          role: row.role,
          period: row.period,
          type: row.type,
          iconKey: row.icon_key || row.iconKey || 'briefcase',
          bullets: row.bullets || [],
          draft: !!row.draft
        });
      } catch (e: any) {
        console.error('Supabase update experience unexpected error:', e);
        return res.status(500).json({ error: e.message || String(e) });
      }
    }
    const experiences = await getExperiences();
    const idx = experiences.findIndex((experience: any) => experience.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: "Experience not found" });
    }
    experiences[idx] = {
      ...experiences[idx],
      title: title || experiences[idx].title,
      role: role || experiences[idx].role,
      period: period !== undefined ? period : experiences[idx].period,
      type: type || experiences[idx].type,
      iconKey: iconKey || experiences[idx].iconKey,
      bullets: bullets || experiences[idx].bullets,
      draft: draft !== undefined ? !!draft : experiences[idx].draft
    };
    const success = await saveExperiences(experiences);
    if (success) {
      res.json(experiences[idx]);
    } else {
      res.status(500).json({ error: "Failed to save experience" });
    }
  });

  // Delete an experience
  app.delete("/api/experiences/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    if (supabase) {
      try {
        const { data, error } = await supabase.from('experiences').delete().eq('id', id).select();
        if (error) {
          console.error('Supabase delete experience error:', error);
          return res.status(500).json({ error: error.message || String(error) });
        }
        if (!data || data.length === 0) return res.status(404).json({ error: 'Experience not found' });
        return res.json({ message: 'Successfully deleted experience' });
      } catch (e: any) {
        console.error('Supabase delete experience unexpected error:', e);
        return res.status(500).json({ error: e.message || String(e) });
      }
    }
    const experiences = await getExperiences();
    const filteredExperiences = experiences.filter((experience: any) => experience.id !== id);
    if (filteredExperiences.length === experiences.length) {
      return res.status(404).json({ error: "Experience not found" });
    }
    const success = await saveExperiences(filteredExperiences);
    if (success) {
      res.json({ message: "Successfully deleted experience" });
    } else {
      res.status(500).json({ error: "Failed to delete experience" });
    }
  });

  // Resume URL
  app.get("/api/resume", async (req, res) => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('resume_settings').select('*').eq('id', 'resume').maybeSingle();
        if (error) {
          console.error('Supabase fetch resume error:', error);
          return res.status(500).json({ error: error.message || String(error) });
        }
        if (data) {
          return res.json({ url: (data as any).url || '' });
        }
      } catch (e: any) {
        console.error('Supabase fetch resume unexpected error:', e);
      }
    }
    const resume = await getResumeSettings();
    res.json({ url: resume.url || '' });
  });

  app.put("/api/resume", requireAuth, async (req, res) => {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Resume URL is required" });
    }
    if (supabase) {
      try {
        const payload = { id: 'resume', url };
        const { data, error } = await supabase.from('resume_settings').upsert(payload).select();
        if (error) {
          console.error('Supabase save resume error:', error);
          return res.status(500).json({ error: error.message || String(error) });
        }
        const row = (data && data[0]) || payload;
        return res.json({ url: row.url });
      } catch (e: any) {
        console.error('Supabase save resume unexpected error:', e);
        return res.status(500).json({ error: e.message || String(e) });
      }
    }
    const success = await saveResumeSettings({ id: 'resume', url });
    if (success) {
      res.json({ url });
    } else {
      res.status(500).json({ error: "Failed to save resume URL" });
    }
  });

  //--- VITE / STATIC MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import('vite');
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