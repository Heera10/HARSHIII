# Our Little Universe 💜🌙
A private birthday website for Harshi. React + TypeScript + Vite, plain CSS, no backend, no accounts.

## Run it on your computer
Requires Node.js 18+ (https://nodejs.org).
```bash
npm install
npm run dev        # opens http://localhost:5173
```
## Build & preview the final site
```bash
npm run build      # type-checks, then writes the site to ./dist
npm run preview    # test the built site at http://localhost:4173
npm test           # 13 automated checks (stories, buttons, media, letters…)
```
> Open the site through a web server (dev/preview or any host). Double-clicking dist/index.html from the
> file system won't work, because browsers block module scripts on file:// pages.

## Publish it (free options)
The `dist` folder is a complete static site and works from any sub-path.
- **Netlify Drop (easiest):** run `npm run build`, then drag the `dist` folder onto https://app.netlify.com/drop
- **Vercel:** `npx vercel` (framework: Vite, output: dist)
- **GitHub Pages:** push `dist` contents to a `gh-pages` branch (or use any Pages action).
Tip: send the link as a surprise on November 6. 🎂

## Where things live
- `src/data/approvedStories.ts` — the six approved chapters, verbatim. Rendered by `components/RichText.tsx`.
- `src/data/media.ts` — your 3 photos + 4 videos, captions, and which chapter each belongs to.
- `src/data/loveNotes.ts`, `openWhenLetters.ts`, `extras.ts` — jar notes, 8 letters, wishes, final letter.
- `public/media/` — display photos (WebP q95, same 900×1600 pixels as your uploads), videos (lossless remux of your MP4s,
  with fast-start), poster frames, and `original/` (your untouched PNGs, opened by "Open original file").
- `src/styles/global.css` — all styling (palette is at the top as CSS variables).

## Changing a caption or swapping media
Edit `src/data/media.ts`. To add a video: drop an H.264 MP4 into `public/media/`, add an entry (width/height = pixel size).
If a video ever won't play in some browser: `ffmpeg -i in.mov -c:v libx264 -pix_fmt yuv420p -movflags +faststart out.mp4`
