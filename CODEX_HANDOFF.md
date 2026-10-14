# Instructions for the implementing Codex agent

Read `README.md`, `DESIGN_AUDIT.md`, and `MVP_PLAN.md` first. Treat these as a plan, not evidence that a route or asset is approved. Inspect the live Figma file and the repository before making code changes. Follow any newer project instructions. Do not edit Figma or release to Production as part of routine implementation.

## Start here

1. Confirm the repository, package manager, and any existing app files. This folder was empty when these plans were made, so scaffold only if it is still empty.
2. Ask for or locate exact approved Figma frame links. For each route, inspect design context and screenshot, including desktop/mobile variants and component states. Update `DESIGN_AUDIT.md` with node links and evidence.
3. Create an asset ledger and export approved assets. Identify any missing product/content inputs before inventing copy or pictures.
4. Implement in focused batches: foundation; Home/navigation; full Learn page; product cards and expanded view; checkout; remaining approved routes; final QA. At each batch, show screenshots and summarize the remaining mismatch for review.

## Implementation rules

- Prioritize near-exact visual fidelity to approved Figma frames. Improve semantic structure, responsive behavior, accessibility, and performance without drifting from the visual language. Log visible improvements and the reason.
- Use real text and approved media. If a Figma screen contains placeholders, ask for the final content or propose a clearly marked draft for review.
- Share design tokens and components across pages. Use responsive layout rules, not separate fixed-size screenshots.
- Implement visible states: hover, focus, active, selected, loading, empty, error, and mobile menus where relevant.
- Preserve the confirmed paths: Home and Learn are full pages; selecting a product card expands it on the same page; clicking the cart icon opens checkout directly. Do not insert an intermediate cart page unless the owner changes the plan.
- This is a UI/UX class demo. Keep the checkout visually faithful but label it as a demo; never accept card numbers, charge a payment method, or suggest a real order was placed. A prototype confirmation is acceptable if it is clearly labeled.
- Do not deploy Production until the owner reviews a concrete Vercel Preview and authorizes release. A local build or source inspection is not live verification.

## Suggested first task

“Inspect the latest Kliks Figma file and this empty website folder. Complete `DESIGN_AUDIT.md` with the approved page/frame links, route map, assets, interactions, missing content, and visual reference screenshots. Then scaffold the Next.js foundation and implement the Home page at desktop and mobile widths. Show comparison screenshots and list any mismatches before continuing.”

## Review checkpoints

| Checkpoint | Show the owner | Continue when |
| --- | --- | --- |
| Audit | Route/frame map, asset ledger, proposed MVP content | Scope and missing inputs are clear. |
| Foundation + Home | Live local screenshots beside Figma at desktop/mobile widths | Visual direction and responsive behavior are accepted. |
| Store journey | Full Learn page, expanded product state, cart click to checkout, remaining approved links | All visible controls have working outcomes. |
| Preview | Vercel Preview URL, flow results, visual comparison, open issues | Owner authorizes Production release. |

## Final delivery record

Report the repository state, routes completed, exact Figma frames matched, known deviations, tests run, Preview URL, and whether Production was deployed. State plainly if Spline, domain, or content remains pending, and confirm checkout is demo only.
