import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import OpenAI from "openai";

dotenv.config();
const app = express();
const upload = multer({ dest: "uploads/" });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => res.send("Lectro API running ✅"));

// Whisper fallback route
app.post("/api/transcribe", upload.single("audio"), async (req, res) => {
  try {
    const file = fs.createReadStream(req.file.path);
    const result = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
    });
    res.json({ text: result.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Transcription failed" });
  }
});

// Summarize lecture
app.post("/api/summarize", async (req, res) => {
  const { transcript } = req.body;
  try {
    const prompt = `
      Summarize this lecture and make 5 flashcards + 3 key terms:
      ${transcript}
    `;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });
    res.json({ notes: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Summary failed" });
  }
});

// Define term
app.post("/api/define", async (req, res) => {
  const { term } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: `Give a 2-sentence definition and one example for: ${term}`,
      }],
    });
    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Definition failed" });
  }
});

app.listen(3001, () => console.log("🚀 Lectro API running on http://localhost:3001"));