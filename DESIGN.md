---
name: Obsidian Velocity
colors:
  surface: '#0c1322'
  surface-dim: '#0c1322'
  surface-bright: '#323949'
  surface-container-lowest: '#070e1d'
  surface-container-low: '#141b2b'
  surface-container: '#191f2f'
  surface-container-high: '#232a3a'
  surface-container-highest: '#2e3545'
  on-surface: '#dce2f7'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#dce2f7'
  inverse-on-surface: '#293040'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0c1322'
  on-background: '#dce2f7'
  surface-variant: '#2e3545'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 24px
  container-max: 1440px
---

## Brand & Style

The design system is engineered for the high-stakes, high-uptime environment of smart transport logistics. It prioritizes rapid information processing, systemic reliability, and a robust "industrial-tech" aesthetic.

The visual style is a blend of **Minimalism** and **Modern Corporate**, utilizing a deep dark mode to reduce eye strain for operators during long shifts. It employs a "Black Ops" palette—near-black backgrounds paired with ultra-vivid, high-contrast status signals—to ensure that critical alerts and fleet movements are immediately decodable. 

- **Reliability:** Sturdy layouts and clear containment.
- **Precision:** Tight spacing and sharp typography.
- **Action-Oriented:** High-contrast primary actions that stand out against the deep void of the interface.

## Colors

This design system utilizes a high-contrast dark palette designed for clarity in data-dense dashboards.

- **Background & Surface:** The core UI uses `#0c1322` as the foundational layer. Cards and sidebars use `#191f2f` to create a subtle separation from the background without relying on heavy shadows.
- **Accents & Status:** 
    - **Primary (#3B82F6):** Used for primary actions, active navigation states, and "On Trip" vehicle status.
    - **Success (#10B981):** Represents "Available" or "Completed" states.
    - **Warning (#F59E0B):** Signals "In Shop" or "Suspended" states requiring attention but not immediate action.
    - **Danger (#EF4444):** Reserved for "Retired," "Cancelled," or critical system errors.
- **Borders:** Low-opacity white or mid-gray borders (`#2e3545`) are used to define component boundaries in the absence of light-based elevation.

## Typography

The typography strategy balances modern readability with a technical edge. 

- **Headlines (Hanken Grotesk):** Provides a sharp, contemporary feel for page titles and section headers.
- **Body (Inter):** Chosen for its exceptional legibility in dark mode, particularly at small sizes in data tables.
- **Technical Labels (JetBrains Mono):** Used for IDs (e.g., Vehicle IDs, License Numbers), timestamps, and status labels to give the system a functional, "developer-tool" precision.

For mobile devices, `headline-lg` should scale down to `24px` to ensure UI containers do not overflow.

## Layout & Spacing

The system follows a **Fluid Grid** model within a maximum container width of 1440px. 

- **Grid:** A 12-column layout on desktop, 8-column on tablet, and 4-column on mobile.
- **Rhythm:** An 8px base unit (derived from the 4px micro-unit) governs all padding and margins to maintain industrial consistency.
- **Data Density:** Table rows should maintain a compact height (40px–48px) to maximize the amount of information visible on one screen without scrolling.
- **Sidebar:** A fixed-width left navigation (240px) is preferred for rapid switching between fleet, drivers, and analytics.

## Elevation & Depth

In this dark-mode environment, depth is conveyed through **Tonal Layers** rather than traditional shadows.

- **Level 0 (Background):** `#0c1322` — The base canvas.
- **Level 1 (Cards/Sidebars):** `#191f2f` — Slightly raised containers.
- **Level 2 (Modals/Popovers):** `#232a3a` — The highest tier of surface.
- **Outlines:** All Level 1 and Level 2 surfaces must have a 1px solid border (`#2e3545`) to ensure visibility against the background. 
- **Active State Glow:** Primary buttons and "On Trip" badges may use a subtle, 4px blur outer glow in their respective accent color (opacity 20%) to indicate "active" or "live" status.

## Shapes

The design system uses a **Soft** shape language. 

- **Standard Elements:** Buttons, input fields, and small cards use a `4px` (0.25rem) radius to feel precise and professional.
- **Large Containers:** Dashboard widgets and main content areas use a `8px` (0.5rem) radius.
- **Status Badges:** Use a `4px` radius or a full pill shape (100px) depending on the density of the table they inhabit; pill shapes are preferred for primary status tags.

## Components

- **Buttons:** Primary buttons use a solid `#3B82F6` background with white text. Secondary buttons use a ghost style (border only) or a subtle gray surface. All buttons feature a 4px corner radius.
- **Status Badges:** These are critical. They should feature a background opacity of 20% of their status color, with a solid 1px border and 100% opacity text of the same color (e.g., Emerald text on a 20% Emerald background).
- **Input Fields:** Dark background (`#070e1d`), 1px border (`#2e3545`), and Inter (Body-md) text. On focus, the border transitions to the primary Blue.
- **Data Tables:** Zebra striping is avoided. Instead, use thin horizontal dividers (`#191f2f`). Headers should use `label-sm` (JetBrains Mono) for a technical appearance.
- **Cards:** Low-profile elevation with 1px borders. Use "Indicator Strips" (a 4px vertical color bar on the left edge) to show the health or status of the item inside the card.
- **Progress Bars:** Thin (4px - 6px) tracks with high-contrast fills to show fleet utilization or trip completion percentages.
