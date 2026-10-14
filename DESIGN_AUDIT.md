# Figma and asset audit

This is the October 7, 2026 review audit. Figma metadata and screenshots were inspected for the listed desktop and mobile frames. The owner will review this audit before implementation. A frame's existence does not prove that its interactions or content are final.

## Confirmed scope and route map

- First pass: Home, full Learn page, same-page expanded product state, and demo checkout reached directly from the cart icon.
- Later: Shop, Find Your Keyboard, and About. Their links and CTAs are visible in the current Home, Learn, navigation, and footer designs. For now, link them to an under-construction page with buttons back to Home and Learn.
- Product names, prices, options, images, and copy may remain class-project placeholders. Present them consistently as demo data, including in totals.
- Checkout is a UI/UX demo. Preserve the Figma payment provider buttons and card fields as visual form controls. The user may type into them, but no payment action or provider connection is wired. Pressing the review/pay button shows a clear message that the payment is a demo and does not work. Do not transmit or store entered payment details or claim an order was placed.

## Starting observations (October 7, 2026)

| Evidence | What is visible from Figma structure | What still needs verification |
| --- | --- | --- |
| [Home—Desktop, node 9008:389](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=9008-389) | 1440px screenshot and structure inspected: white hero with gradient KLIKS wordmark and centered 3D keyboard slot; four discovery cards; dark switch-sound section; favorites carousel; teal Learn CTA; footer. | Carousel, sound, favorite, and deferred-link behavior; asset export and intermediate-width layout. |
| [Home—Mobile, node 9008:391](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R?node-id=9008-391) | 360px screenshot and structure inspected: cropped keyboard hero below gradient wordmark; stacked hero buttons; 2×2 discovery tiles; vertical switch options; horizontally swiped favorites; teal Learn CTA; long footer. | Live Spline sizing/touch behavior, interactions, and 320px/intermediate-width overflow. |
| [Learn—Desktop, node 12467:330](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=12467-330) | 1440px screenshot and structure inspected: split copy/photo hero; six-guide horizontal carousel; three topic cards; dark Find My Keyboard CTA; footer. | Guide destinations, carousel behavior, image exports, and deferred CTA behavior. |
| [Learn—Mobile, node 12469:649](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=12469-649) | 360px screenshot and structure inspected: stacked hero and photo; vertical list of six guides; three stacked topic cards; dark CTA; footer. | Guide destinations, image exports, and 320px/intermediate-width layout. |
| [Expanded product card, desktop/mobile nodes 12407:1636 and 12407:1690](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=12407-1636) | 1200px desktop and 360px mobile screenshots inspected. Both show Kliks K3 imagery, gallery, demo rating/price, four colorways, three switch choices, quantity, Add to Cart, and wishlist. | Same-page expansion/collapse behavior, focus management, and whether wishlist state persists. |
| [Checkout—Desktop, node 12265:470](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R?node-id=12265-470) and [Checkout—Mobile, node 12266:208](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R?node-id=12266-208) | 1440px and 360px screenshots inspected. Both have order summary, recommendations, totals, progress, and a payment panel. Current content shows Keychron K8 Pro and payment fields; it does not match the Kliks K3 expanded card. | Align demo product data across screens; keep the fields visual-only, add demo-payment feedback, and support empty/multiple-item states. |

Earlier project notes mention Learn, product cards, navigation, and other library components. Recheck them in the live file; do not treat old notes as proof of current approval.

## Page inventory to fill in

| Route or flow | Desktop Figma link | Mobile Figma link | Status: approved / draft / absent | Key interactions | Assets and copy ready? | Owner decision |
| --- | --- | --- | --- | --- | --- | --- |
| Home | [1440px frame](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=9008-389) | [360px frame](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=9008-391) | In first pass; visual review pending | Spline hero, discovery, switch sounds, favorites, Learn | Figma imagery; scene URL supplied; audio unverified | Review deferred CTAs and scene fallback |
| Shop/catalog | — | — | Later | — | Demo product set can use Figma content | No separate Shop route in first pass |
| Product expanded view | [Expanded desktop state](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=12407-1636) | [Expanded mobile state](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=12407-1690) | Required same-page interaction | Gallery, options, quantity, add to cart, collapse | Figma content acceptable as placeholder | Confirm interim wishlist behavior |
| Find Your Keyboard | — | — | Later | — | — | Review interim CTA response |
| Learn full page | [1440px frame](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=12467-330) | [360px frame](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=12469-649) | In first pass; visual review pending | Hero, guides, topics, CTA | Figma content acceptable as placeholder | Review guide link destinations |
| About | — | — | Later | — | — | Review interim navigation response |
| Cart click → demo checkout | [1440px frame](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=12265-470) | [360px frame](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=12266-208) | Required, with visual-only payment controls | Cart icon opens checkout directly; edit items and totals; demo message on review/pay | Figma placeholders acceptable | Keep product details consistent with the chosen Home card |

Do not invent finished routes for deferred Figma destinations. The current designs visibly include Shop/About navigation, Find My Keyboard buttons, a See More Keyboards button, and Learn guide/topic links. Route these to the under-construction page with a way back to built pages.

## Asset ledger

Create an entry for every logo, icon, font, product image, audio clip, and 3D scene. Record the Figma node/export source, license or ownership, destination file, and whether the asset is final. Use optimized web formats while keeping source exports outside the served asset folder. Do not substitute generic product photography or placeholder content in the release without explicit approval.

| Asset | Source / node | Final? | Web file | Notes |
| --- | --- | --- | --- | --- |
| Kliks logo and icons | Figma exports plus local SVGs | Prototype | `public/images/kliks-mark.svg`, `public/images/kliks-logotype.svg`, `public/icons/`, `public/learn/arrow-forward.svg` | Navigation, footer, Home actions, Learn carousel, and checkout controls use SVG assets. |
| Product and discovery imagery | Home Figma exports | Prototype placeholders | `public/images/` | K2–K7, K3 gallery, and discovery images are local; product details are demo data. |
| Learn imagery | Learn Figma exports | Prototype | `public/learn/` | Hero, guides, and topic imagery are local. |
| Fonts | Lato in Figma | Prototype | `@fontsource/lato` package | 400, 700, and 900 weights self-hosted by the app. Confirm font licensing before any public release. |
| Switch audio | No separate audio file verified | Demo synthesis | Generated in the browser on key press | TODO: replace the placeholder tones with recorded Linear, Tactile, and Clicky switch sounds. Preserve on-screen and physical L/T/C keyboard triggers. |
| Spline scene | `https://prod.spline.design/K-uAyHz9OO1HvfNc/scene.splinecode` supplied by owner | Supplied; browser tested | External embed via the client entry of `@splinetool/react-spline` | The `/next` entry is an async Server Component and caused a Client Component error on Home. The client entry renders without that console error. The published scene still has a white background; CSS multiply blending lets the gradient wordmark show through as a temporary visual treatment. For true transparency, export/publish the scene with alpha from Spline and then remove the blend workaround. |

## Visual comparison record

Figma screenshots were visually inspected through the plugin at native frame sizes, but have not been saved into this workspace. The local page was reviewed in the browser at 360, 800, 1024, 1110, 1280, 1440, and 1920px. No document-level horizontal overflow appeared at those widths. The desktop mega menu, mobile submenu, hero, and footer were visually checked. The browser console showed no error after the Spline import fix. TypeScript and the production build passed. Remaining visual review: compare exact Figma spacing and imagery side by side at native widths, and replace the published Spline background with alpha for a cleaner hero.

## Switch guide addition (October 11, 2026)

- New Figma [desktop guide, 1440px](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=12599-983) and [mobile guide, 360px](https://www.figma.com/design/zgKp1puDNezPdsK9gWlN9R/Muazuddin-Mohammed--Website-Project?node-id=12599-1252) are on `— Interior Pages`. They reuse the Learn navigation, CTA, and footer. The three switch colors are Figma variables; the six responsive feel-card variants are in `Card / Switch Feel`. Five original vector diagrams are on `— Cards` and exported into `public/learn/switch-guide/`.
- The matching Learn article and topic cards navigate to these frames in Figma and to `/learn/switches` in code. Four Figma jump links scroll to their sections. The breadcrumb returns to Learn. The sound link in Figma opens the local Home sound demo because Figma's `NAVIGATE` action only accepts a top-level frame on the same Figma page; in code it links to `/#hear-the-difference`.
- Browser review found the new page's five SVGs and fonts loaded, no horizontal overflow in a 360px embedded viewport or at 1280px, and working guide card, topic card, header, jump, and Home sound links. `npm.cmd run typecheck` and `npm.cmd run build` passed; the production build statically generated `/learn/switches`. This review covers the new guide, not a fresh audit of existing pages.
