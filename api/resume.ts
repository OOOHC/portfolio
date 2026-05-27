import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs/promises";
import path from "path";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).end("Method Not Allowed");
  }

  const resumePath = path.join(process.cwd(), "public", "resume.pdf");

  try {
    const resumeBuffer = await fs.readFile(resumePath);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="resume.pdf"');
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");

    if (req.method === "HEAD") {
      return res.status(200).end();
    }

    return res.status(200).send(resumeBuffer);
  } catch (error) {
    console.error("Failed to serve resume PDF:", error);
    return res.status(404).json({ error: "Resume PDF not found" });
  }
}
