# Mikyas & Almaz — Figma Style Guide (Option B)

This folder contains a lightweight “design kit” you can use to recreate the site in Figma quickly:
- **Design tokens** (colors, radius, shadows, typography)
- **Reference screenshots** (desktop + mobile)
- **Image assets** used by the website

## 1) Typography
- **Heading font:** Playfair Display
  - H1: clamp(3.2rem, 8vw, 6.2rem), line-height ~0.95
  - H2: clamp(2rem, 4vw, 3.2rem), line-height ~1.05
- **Body font:** Inter
  - Body line-height: ~1.75
- **Eyebrow label:**
  - Uppercase, letter-spacing ~0.22em, ~0.82rem, weight 700

## 2) Color system (from CSS variables)
Use the token file for exact values:
`tokens/design-tokens.json`

Suggested usage:
- **Background:** soft blue/gray gradients (bg-1/bg-2/bg-3)
- **Text:** text + muted
- **Accents:** accent + accent-strong

## 3) Glass / Apple-like cards
Core recipe:
- **Fill:** white with transparency (approx 45%–75%)
- **Border:** 1px white at ~45% opacity
- **Backdrop blur:** blur(18px) saturate(140%)
- **Shadow:** soft, wide (see tokens)
- **Corners:** 18–32px radius

## 4) Components to recreate in Figma
- **Bottom floating nav (“dock”)**
  - Fixed, centered, pill radius, glass fill, shadow
- **Hero**
  - Background photo + dark overlay gradient
  - Hero card with glass fill
- **Countdown tiles**
  - Four equal tiles, centered numbers
- **Timeline items**
  - Two-column row: time + title/description
- **Gallery**
  - Horizontal scrolling cards (use a horizontal Auto Layout frame)

## 5) Figma build steps (fast)
1. Create **Color Styles** using `design-tokens.json` (bg, text, accent, glass).
2. Create **Text Styles** (H1/H2/H3/Body/Eyebrow).
3. Make a **Card component** (glass recipe + radius variants).
4. Place the exported screenshots on a “Reference” page.
5. Rebuild the layout using Auto Layout and the image assets in `assets/`.

