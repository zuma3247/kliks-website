# Kliks website MVP

This folder contains a responsive Next.js prototype built from the current Figma designs. [MVP_PLAN.md](MVP_PLAN.md), [DESIGN_AUDIT.md](DESIGN_AUDIT.md), and [CODEX_HANDOFF.md](CODEX_HANDOFF.md) record the original plan and review gates.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`. `npm.cmd run typecheck` and `npm.cmd run build` check the implementation.

## Current implementation

- `/`: Home with the supplied Spline scene, discovery cards, switch sound demos, favorites, and same-page product expansion.
- `/learn`: Full Learn page with desktop guide carousel and mobile guide list.
- `/learn/switches`: Beginner's visual switch guide with press-path and anatomy diagrams, three switch feel cards, and a responsive comparison.
- `/checkout`: Local demo cart, quantity and removal controls, recommendations, and visual-only payment form. Entered payment details remain in component state; the review action only shows a demo message.
- `/coming-soon`: Under-construction page for deferred destinations, with links back to Home and Learn.

The switch guide is linked from the matching Learn article and topic cards, the Learn navigation menu, and the footer's Switches 101 link. Its diagrams are exported from the new Figma frames, and its Inter and Bricolage Grotesque fonts are self-hosted.

The Spline MCP server has been registered in the user's Codex configuration. The site embeds the supplied scene URL through Spline's client component. The published scene needs an alpha background for true transparency; the hero currently uses CSS blending to show the gradient wordmark behind it. No production deployment has been made.

## Intended result

A polished, working website that closely matches the approved Figma frames at desktop and mobile sizes, with sensible improvements for accessibility, responsiveness, loading speed, and real interactions. The live release should never imply that a purchase succeeded unless a real payment provider and order flow have been connected and tested.

## Current evidence and open inputs

- Figma design file confirmed by the project owner: [Kliks design](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=1-11). Confirm which frames within it are approved for the release.
- Directly inspected on October 7, 2026: Home desktop/mobile (`9008:389`, `9008:391`), Learn desktop/mobile (`12467:330`, `12469:649`), expanded product-card desktop/mobile (`12407:1636`, `12407:1690`), and the `— Interior Pages` canvas (`9017:28`), via Figma metadata. This is structural evidence, not a complete visual audit.
- The owner confirmed that Home and Learn are full MVP pages; clicking Cart should open the checkout screen; selecting a product card should expand it on the same page; checkout is a UI/UX class demo with no real payments.
- The website folder was empty when the plans were prepared; it now contains the prototype and Figma-exported assets.
- TODO: Add recorded Linear, Tactile, and Clicky switch audio files in place of the generated demo tones. Keep both the clickable keys and physical L/T/C keyboard shortcuts.
- October 7 scope clarification: Shop, Find Your Keyboard, and About can come later; placeholder product details are acceptable for this UI/UX class project. The Spline scene URL has been supplied and is recorded in `DESIGN_AUDIT.md`. The owner requested review of the updated audit before implementation.

## Working rule

Figma is the visual source of truth for approved screens. If a design is incomplete, document the gap and propose the smallest coherent completion. Record any intentional visual change in the audit before implementing it.
