import { Router } from "express";
import prisma from "../lib/prisma.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);

// POST /api/notes — Create note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const note = await prisma.note.create({
      data: { title, content, userId: req.userId },
    });
    res.status(201).json(note);
  } catch (error) {
    console.error("Create note error:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
});

// GET /api/notes — Get all notes for user
router.get("/", async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.userId },
      orderBy: { updatedAt: "desc" },
    });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Get notes error:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// PUT /api/notes/:id — Update note
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const existing = await prisma.note.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Note not found" });
    if (existing.userId !== req.userId) return res.status(403).json({ error: "Forbidden" });
    const updated = await prisma.note.update({
      where: { id },
      data: { title, content },
    });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update note error:", error);
    res.status(500).json({ error: "Failed to update note" });
  }
});

// DELETE /api/notes/:id — Delete note
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.note.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Note not found" });
    if (existing.userId !== req.userId) return res.status(403).json({ error: "Forbidden" });
    await prisma.note.delete({ where: { id } });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete note error:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

export default router;




