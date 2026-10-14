# Kliks

Kliks is a fictional mechanical-keyboard website built for a UI/UX class project. I translated responsive designs from Figma into a working Next.js demo and added small interactions to show how the experience could feel in a browser.

**This is a class prototype, not a real store.** Product details are sample content. Checkout is visual only: it does not accept or process payments or place orders.

- **Live demo:** [kliks-website.vercel.app](https://kliks-website.vercel.app/)
- **Figma design:** [Kliks website project](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project)

## What’s included

- Home page with an interactive 3D keyboard, product cards, and switch-sound demos
- Learn pages, including a visual guide to mechanical switches
- A local demo cart and visual-only checkout
- Responsive layouts and navigation for desktop and mobile

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000). To check the project, run `npm.cmd run typecheck` and `npm.cmd run build`.

## Tech

Next.js, React, TypeScript, and CSS. The 3D keyboard is embedded from Spline; the rest of the site’s images and diagrams are local assets.

Additional project notes are in [`docs/`](docs/).
