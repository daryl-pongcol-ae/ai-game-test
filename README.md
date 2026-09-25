# Vim Snake 🐍

A browser-based Snake game with **vim-style controls** (hjkl) and persistent high scores.

## Quick Start

```bash
npm install --production
PORT=3000 node server.js
```

Open `http://127.0.0.1:3000` in a browser. The server stays in the foreground and listens on `PORT` (default 3000).

## How to Play

1. **Enter your name** on the start screen, then click "Start Game" or press Enter.
2. **Control the snake** with vim keys:
   - `h` — move left
   - `j` — move down
   - `k` — move up
   - `l` — move right
   - Arrow keys also work
3. **Eat mice** (grey critters) — each mouse eaten scores **100 points** and grows the snake by 1 segment.
4. **The snake wraps** — it can cross from left to right, right to left, top to bottom, and bottom to top.
5. **After eating 10 mice**, an orange **rabbit** appears. Eating the rabbit:
   - Increases speed slightly
   - **Doubles** your score multiplier (mice are now worth 200, then 400, etc.)
   - Resets the mouse counter — eat 10 more mice for the next rabbit
6. **Game over** when the snake collides with itself.
7. Your score is saved automatically and shown in the high-score table.

## Scoring

| Event | Points |
|-------|--------|
| Eat a mouse | 100 × current multiplier |
| Eat a rabbit | 500 × current multiplier |

The multiplier starts at 1× and doubles each time you eat a rabbit. Rabbits appear after every 10 mice eaten.

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `scores` | Returns top 20 scores as JSON array |
| POST | `scores` | Submit a score: `{ "name": "string", "score": number }` |

Scores are stored in `scores.json` and survive server restarts.

## Hosting Notes

- All URLs in the page are **relative** — works behind a reverse proxy with a path prefix.
- No external CDN, fonts, or scripts — fully self-contained.
- No cookies, localStorage, or sessionStorage required.
- CORS is enabled for cross-origin API access.
- The game renders on an HTML5 canvas (640×480).
