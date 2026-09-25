const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;
const SCORES_FILE = path.join(__dirname, "scores.json");

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function loadScores() {
  try {
    if (fs.existsSync(SCORES_FILE)) {
      return JSON.parse(fs.readFileSync(SCORES_FILE, "utf8"));
    }
  } catch (_) {}
  return [];
}

function saveScores(scores) {
  fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2), "utf8");
}

app.get("/scores", (_req, res) => {
  const scores = loadScores();
  scores.sort((a, b) => b.score - a.score);
  res.json(scores.slice(0, 20));
});

app.post("/scores", (req, res) => {
  const { name, score } = req.body;

  if (typeof name !== "string" || name.trim().length === 0 || name.trim().length > 30) {
    return res.status(400).json({ error: "Name must be 1-30 characters." });
  }
  if (typeof score !== "number" || !Number.isFinite(score) || score < 0 || score > 1000000) {
    return res.status(400).json({ error: "Score must be a number between 0 and 1,000,000." });
  }
  if (Math.floor(score) !== score) {
    return res.status(400).json({ error: "Score must be a whole number." });
  }

  const scores = loadScores();
  scores.push({ name: name.trim(), score, date: new Date().toISOString() });
  scores.sort((a, b) => b.score - a.score);
  const trimmed = scores.slice(0, 100);
  saveScores(trimmed);

  res.status(201).json({ ok: true });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Vim Snake server listening on http://127.0.0.1:${PORT}`);
});
