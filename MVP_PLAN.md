# Kliks MVP implementation plan

## Goal and release boundary

Build a responsive, accessible Kliks storefront experience that closely reproduces the approved Figma designs. Home and Learn are required full pages. Selecting a product card expands it on the same page. Clicking the cart icon opens the checkout screen directly, with the selected products visible there. This is a UI/UX class demo: payment fields may be typed into for visual interaction, but their values must remain local to the form, no payment action is wired, and the review/pay button explains that demo payment does not work.

## Proposed technical foundation

- Use Next.js App Router with TypeScript, deployed on Vercel. Keep product/content data in typed local files for the first prototype; switch to a CMS or commerce backend only when editing or inventory needs justify it.
- Build a small design token layer from Figma for color, typography, spacing, radii, shadows, and breakpoints. Make reusable navigation, buttons, cards, product controls, form fields, and footer components.
- Render page content server-side where practical; use client components only for the menu, product options, cart, quiz, audio, and Spline interaction.
- Store a prototype cart locally with versioned state. Use fixed demo product/pricing data and label checkout accordingly. A local cart is not a real order system.
- Use approved Figma exports and responsive image sizing. Preserve keyboard access, focus states, readable contrast, reduced motion, and image alternatives.
- If any private API is later added, keep its credentials in Vercel environment variables and out of client code.

## MVP scope, ordered by dependency

1. **Design inventory and foundation.** Use the Figma file supplied by the owner; confirm the approved frame links; audit assets, fonts, content, page states, and behavior; establish tokens, typography, grid, and responsive shell.
2. **Home and navigation.** Match the 1440px and 360px Home frames. Implement discovery tiles, switch-sound interaction, favorites, CTA, and footer. Make the Learn link reach the full Learn page and the cart icon open checkout directly.
3. **Learn full page.** Match the 1440px and 360px Learn frames: hero, six guides, topic cards, CTA, and footer. The desktop guide carousel and mobile vertical list should follow their respective designs. Only link articles to destinations that exist or are approved for this MVP.
4. **Catalog and expanded product view.** Use a small approved product set. Selecting a product card expands it on the same page into the designed state, including image gallery, colorway, switch type, quantity, and Add to Cart. Provide a clear way to collapse it and restore focus appropriately. Add browse/search/filter only where the designs and data support them.
5. **Demo checkout.** The cart icon opens checkout directly. Show selected products, editable quantities, removal, totals, and empty state on that screen; preserve cart state across navigation. Keep the Figma payment form visually interactive, but do not store or transmit entered payment details or connect payment methods. The review/pay action explains that this is a demo payment and does not work.
6. **Deferred destinations.** Shop, Find Your Keyboard, About, and other unbuilt destinations lead to an under-construction page with a link back to Home or Learn. Never leave a visible CTA with no outcome.
7. **Visual polish and deployment.** Compare each route to Figma at native desktop/mobile widths and intermediate widths. Fix mismatch, accessibility issues, broken links, overflow, slow images, and runtime errors. Deploy a Vercel Preview for review, then release to Production after owner approval.

## Spline integration

Reserve the hero/feature area defined by the final Figma design. After the embed is supplied, test loading, sizing, touch behavior, keyboard access, and battery/performance on a real mobile viewport. Show a poster or lightweight fallback while loading or when reduced motion/data is preferred. Do not block the headline, CTA, or page navigation on the 3D scene. If the embed harms mobile performance, keep it on desktop and use the approved static fallback on mobile; record this as a design decision.

## Definition of done

- Every included route has a confirmed Figma target or an explicitly approved completion for missing screens.
- The main journey works with keyboard, mouse, and touch: Home → same-page expanded product → Add to Cart → cart icon → demo checkout, plus Home → full Learn page. Links and controls have actual outcomes.
- Desktop and mobile screenshots closely match Figma in composition, spacing, type, color, and assets; intentional changes are documented.
- No horizontal overflow at 320px, 360px, 390px, tablet width, and desktop width. Focus is visible, controls have accessible names, and reduced-motion behavior is usable.
- Production build and lint/type checks pass; key user flows pass browser checks; no console errors or broken assets remain.
- A Vercel Preview is reviewed before Production. The live site has correct metadata, favicon, domain/settings, and clear demo status.

## Decisions needed from owner

1. Confirm which additional page frames beyond Home, Learn, expanded product card, and checkout are approved for the first release.
2. Supply final product data, imagery, prices, copy, and switch audio or approve a smaller content set.
3. Spline embed supplied; choose the static fallback treatment at the audit review checkpoint.
4. Confirm the Vercel account/project and whether a custom domain is part of the first release.

## Reference documentation

- [Vercel Git deployments and Preview/Production behavior](https://vercel.com/docs/git)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Next.js production checklist](https://nextjs.org/docs/app/guides/production-checklist)
