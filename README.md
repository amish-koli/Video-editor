# Video Editor Portfolio

React + Vite portfolio site.

## Run it

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

The finished site is in the `dist` folder.

## Add a new video

1. Open `src/data.js`.
2. Copy one block inside `PROJECTS`, paste it at the end, change the values.
3. Optional cover image: put it in `public/images/` and set `thumb: "/images/name.jpg"`.

Save the file and the site updates on its own.

## Change your name, email and text

Edit the `SITE` object at the top of `src/data.js`. Also change the `<title>` in `index.html`.

## Put it online (Vercel)

```bash
git init
git add .
git commit -m "portfolio"
```

Push to a GitHub repository, then import it on vercel.com. It detects Vite automatically.
