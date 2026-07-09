# KiloTrace Design System And Motion Spec

## 1. Brand Direction

KiloTrace is a material loss intelligence platform for manufacturers. The product traces scrap, rework, and yield loss from shop-floor event to root cause to financial impact.

The visual system should feel like a serious European industrial SaaS company: clean, technical, premium, readable, and product-led. It should borrow the cinematic motion ambition of Tulip, the clean card readability of Guidewheel, and the practical manufacturing credibility of MachineMetrics and Augury.

Core positioning:

> Trace material loss from shop floor to root cause to cost.

Primary tagline:

> Trace material loss. Recover margin.

## 2. Visual Principles

- Premium industrial, not generic AI SaaS.
- Motion-led hero sections, but calm and controlled.
- Dark cinematic hero scenes paired with clean white content sections.
- Liquid glass cards only where they add depth: hero, product-page hero, demo page, dashboard overlays.
- Realistic product/dashboard visuals, not cartoon-only UI.
- Typography should be readable and confident, using medium or semibold weights rather than heavy bold.
- Visual hierarchy should come from spacing, scale, contrast, and motion rather than oversized text.
- Avoid excessive green, default blue SaaS styling, purple-blue gradient dominance, and cluttered dark dashboards.

## 3. Reference Learnings

### Tulip

Use as the primary motion and hero reference.

What to borrow:

- Animated production systems.
- Dark technical backgrounds.
- Map, grid, node, and factory-flow visuals.
- Realistic dashboards and app panels.
- Clean mega navigation.
- Motion that explains what the platform does.

### Guidewheel

Use for readability, white-space rhythm, card layout, and proof sections.

What to borrow:

- Clean white page bands.
- Large readable feature cards.
- Rounded/pill navigation and CTAs.
- Dashboard visuals paired with short text.
- Demo page clarity.

### MachineMetrics

Use for practical manufacturing credibility.

What to borrow:

- Strong demo page structure.
- Product proof and use-case framing.
- Complete footer with address, contact, platform, applications, and resources.

### Augury

Use for comparison and connected-intelligence sections.

What to borrow:

- Legacy tools vs. platform comparison.
- Connected intelligence diagram with central system and surrounding cards.
- Scroll-triggered motion where elements feel linked.

## 4. Color System

The palette should be dark industrial with clean light surfaces and controlled accent colors.

### Core

- Ink 950: `#061115` - deepest hero background.
- Ink 900: `#071D24` - dark page background.
- Ink 800: `#0B2B34` - elevated dark surfaces.
- Slate 700: `#33464D` - muted structure.
- Slate 500: `#6D7D82` - secondary text.
- Mist 100: `#EEF5F3` - light background tint.
- Mist 50: `#F7FAF8` - main light section background.
- White: `#FFFFFF`.

### Accents

- Trace Teal: `#25C7B7` - primary data-flow accent.
- Signal Amber: `#F3C84B` - CTA and cost/yield highlight.
- Yield Green: `#78C87A` - success/recovery signal.
- Scrap Red: `#E15B4F` - warnings and scrap events.
- Process Blue: `#4B9FE8` - machine/data integration accent.

### Usage

- Hero backgrounds: Ink 950 / Ink 900.
- Primary CTA: Signal Amber with Ink text.
- Secondary CTA: glass/transparent with Mist border.
- Data-flow paths: Trace Teal and Process Blue.
- Warning events: Scrap Red.
- Positive recovery metrics: Yield Green.
- Light sections: Mist 50 or White.

## 5. Typography

Preferred web font direction:

- Primary: `Inter`, `Geist`, or `Suisse-like` neutral sans.
- Avoid overly heavy, blocky, condensed display fonts.
- Letter spacing should remain `0`.
- Use font weights:
  - Regular 400 for body.
  - Medium 500 for nav, buttons, captions, labels.
  - Semibold 600 for headings.
  - Avoid 700/800 except small labels or rare emphasis.

### Type Scale

Desktop:

- Display: 64px / 72px / 600.
- H1: 56px / 64px / 600.
- H2: 40px / 48px / 600.
- H3: 28px / 36px / 600.
- H4: 22px / 30px / 500.
- Body Large: 20px / 32px / 400.
- Body: 16px / 26px / 400.
- Body Small: 14px / 22px / 400.
- Label: 13px / 18px / 500.
- Metric: 40px / 48px / 500.

Mobile:

- H1: 40px / 46px / 600.
- H2: 32px / 40px / 600.
- H3: 24px / 32px / 600.
- Body Large: 18px / 28px / 400.
- Body: 16px / 25px / 400.

## 6. Layout, Spacing, Grid

### Page Widths

- Desktop max content width: 1200px.
- Wide visual max width: 1440px.
- Dashboard/media max width: 1280px.
- Text column ideal width: 560-680px.

### Grid

- Desktop: 12 columns.
- Column gap: 24px.
- Page margins:
  - Desktop: 80px.
  - Laptop: 48px.
  - Tablet: 32px.
  - Mobile: 20px.

### Section Spacing

- Hero vertical padding: 144px top, 96px bottom.
- Standard section padding: 104px desktop, 72px tablet, 56px mobile.
- Compact band padding: 64px desktop, 48px mobile.
- Card grid gap: 24px desktop, 16px mobile.

### Spacing Tokens

- 2: 2px
- 4: 4px
- 8: 8px
- 12: 12px
- 16: 16px
- 20: 20px
- 24: 24px
- 32: 32px
- 40: 40px
- 48: 48px
- 64: 64px
- 80: 80px
- 104: 104px
- 128: 128px

### Radius Tokens

- xs: 4px
- sm: 6px
- md: 8px
- lg: 12px
- xl: 18px
- pill: 999px

Use 8px or less for standard cards unless the card is a deliberate glass overlay or large hero control.

## 7. Glass Card System

Glass cards should feel like industrial data panels, not decorative blur.

### Dark Glass

- Background: `rgba(8, 24, 30, 0.58)`.
- Backdrop blur: 18-28px.
- Border: `rgba(255, 255, 255, 0.16)`.
- Inner highlight: top border or inset light at `rgba(255,255,255,0.10)`.
- Shadow: soft, dark, low opacity.
- Radius: 18-24px for hero panels; 8-12px for dashboard panels.

### Light Glass

- Background: `rgba(255, 255, 255, 0.62)`.
- Backdrop blur: 18px.
- Border: `rgba(255,255,255,0.7)` plus subtle slate border.
- Use mainly for demo forms or overlays on realistic product/plant imagery.

### Rules

- Do not use glass cards for every section.
- Use glass for the hero, product hero overlays, demo page, and selected dashboard cards.
- Keep text contrast high.
- Avoid tiny text on blurred backgrounds.

## 8. Motion System

Motion should clarify the product story.

### Timing

- Hero loop: 12-18 seconds.
- Card entrance: 500-700ms.
- Scroll reveal: 400-600ms.
- Counter animation: 900-1400ms.
- Hover states: 160-220ms.

### Easing

- Use calm ease-out curves.
- Avoid bouncy motion.
- Avoid fast, flashy AI-style pulses.

### Background Motion

Use a lightweight SVG/canvas motion background before considering full Three.js.

Elements:

- Production grid.
- Thin process lines.
- Moving material particles.
- Glowing nodes.
- Event pulses.
- Floating glass data chips.
- Slow parallax.

## 9. Homepage Hero Motion

Hero concept:

KiloTrace shows a dark production map where material moves through a process:

Raw Material -> Machine -> Inspection -> Scrap/Rework -> Finished Goods.

An event appears:

> Scrap spike detected

KiloTrace traces it backward:

- Shift B.
- Batch 1842.
- Machine M-07.
- Supplier Lot 29.
- Operator station.
- Cost impact: EUR 18,420.

The loop ends with the system resolving the event into:

- Root cause likely: setup drift.
- Priority: high.
- Margin at risk: EUR 18.4k.

## 10. Product Page Motion Heroes

### KiloTrace Track

Theme:

Capture every material-loss event.

Motion:

- Shop-floor event chips appear from machines, operator stations, batches, and shifts.
- Events stream into one structured timeline.
- Tags attach: machine, batch, supplier, operator, shift, material.

Hero line:

> Capture scrap, rework, and yield events before they disappear into spreadsheets.

### KiloTrace Root

Theme:

Find why losses happen.

Motion:

- A scrap spike appears on a chart.
- Trace lines move backward through the production map.
- Evidence cards appear: machine drift, supplier variance, setup change, tool wear.
- A central root-cause node is highlighted.

Hero line:

> Find the root causes behind recurring scrap and rework.

### KiloTrace Cost

Theme:

Turn material loss into financial clarity.

Motion:

- Events flow into a cost model.
- Kilos/units convert into euros.
- A waterfall chart expands: material, labor, machine time, energy, disposal, margin.
- Cost is allocated by product, line, cause, customer, and site.

Hero line:

> Translate material loss into cost, margin, and ROI.

## 11. Dashboard Design Concepts

### Executive Overview

Purpose:

Show plant-wide material loss, cost, and recovery opportunity.

Primary widgets:

- Scrap cost this month.
- Rework hours.
- First-pass yield.
- Top loss causes.
- Cost by product family.
- Site/line comparison.
- Recovery opportunity.

### Track Dashboard

Purpose:

Capture and review event-level data.

Primary widgets:

- Event timeline.
- Scrap/rework logging table.
- Machine/shift/batch filters.
- Event detail drawer.
- Reason-code quality status.
- Batch and supplier tags.

### Root Dashboard

Purpose:

Find patterns and likely causes.

Primary widgets:

- Pareto chart.
- Cause correlation map.
- Shift variance panel.
- Machine drift trend.
- Supplier lot comparison.
- Root-cause investigation timeline.

### Cost Dashboard

Purpose:

Connect events to financial impact.

Primary widgets:

- Cost waterfall.
- Scrap cost by product/customer.
- Rework labor cost.
- Material loss by kilo and euro.
- ROI simulator.
- Improvement initiative tracker.

## 12. Website Information Architecture

### Main Navigation

- Platform
  - KiloTrace Track
  - KiloTrace Root
  - KiloTrace Cost
  - Integrations
  - Security
- Solutions
  - Reduce Scrap
  - Cut Rework Cost
  - Improve First-Pass Yield
  - Supplier Quality
  - ESRS Waste Data
- Industries
  - Plastics
  - Metalworking
  - Packaging
  - Automotive Suppliers
  - Electronics
- Resources
  - Guides
  - Case Studies
  - ROI Calculator
- Company
  - About
  - Contact
- CTA: Book a Demo

### Core Pages

- Homepage.
- Platform overview.
- Track product page.
- Root product page.
- Cost product page.
- Industries overview.
- Use cases.
- Request demo.
- Contact.

## 13. Key Sections

Homepage:

1. Dark animated hero.
2. Trust/metrics strip.
3. Problem: finance sees cost, root causes stay hidden.
4. Platform: Track, Root, Cost.
5. Legacy tools vs. KiloTrace.
6. Dashboard/product visual.
7. Use cases.
8. Industries.
9. Integrations.
10. Demo CTA.
11. Complete footer.

## 14. Logo Direction

The logo should be minimal, technical, and readable.

Concept territories:

- Kilo mark: a measured unit or weight signal.
- Trace mark: connected path, node, or line.
- Yield mark: upward recovery path.
- Root-cause mark: traced node inside a production path.

Preferred logo form:

- Geometric symbol plus wordmark.
- Works in dark and light.
- Strong favicon at 16px and 32px.
- Avoid leaf/recycling clichés, generic AI sparkle, or gear-only marks.

Recommended mark concept:

An angular `K` built from two trace lines and a small node, with a subtle kilogram/material measurement feel.

## 15. Favicon Direction

Favicon should be:

- Simple `K` trace mark.
- Dark navy background with Trace Teal or Signal Amber detail.
- Recognizable at 16px.
- No small text.

## 16. Build Notes

Recommended first implementation approach:

- Use CSS/SVG/canvas for hero motion background.
- Use real HTML/CSS for dashboard cards so text stays crisp.
- Use glass UI only in selected dark sections.
- Use generated or custom-rendered dashboard graphics for first site if real product screenshots do not exist yet.
- Later, replace mock dashboard visuals with real app screenshots.

Performance rules:

- Motion must pause/reduce for `prefers-reduced-motion`.
- Avoid heavy 3D unless needed.
- Keep hero animation subtle and under control.
- Use lazy loading for non-hero visuals.

