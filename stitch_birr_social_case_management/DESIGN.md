---
name: بر
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3f4944'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6f7973'
  outline-variant: '#bec9c2'
  surface-tint: '#1b6b51'
  primary: '#004532'
  on-primary: '#ffffff'
  primary-container: '#065f46'
  on-primary-container: '#8bd6b7'
  inverse-primary: '#8bd6b6'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#393d3f'
  on-tertiary: '#ffffff'
  tertiary-container: '#505456'
  on-tertiary-container: '#c5c8ca'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a6f2d1'
  primary-fixed-dim: '#8bd6b6'
  on-primary-fixed: '#002116'
  on-primary-fixed-variant: '#00513b'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
  display-md:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-lg:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-md:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin-desktop: 48px
---

## Brand & Style
The design system is anchored in the principles of human-centricity and professional growth. It targets non-profit organizations, charitable institutions, and social impact platforms where trust and clarity are paramount. 

The aesthetic follows a **Modern-Corporate** direction with a focus on **Minimalism**. By prioritizing generous whitespace and high-quality typography, the UI creates a serene environment that encourages focus on the mission of giving. The interface should feel "breathable," avoiding clutter to allow the primary emerald tones to signify life and progress against a stable, structured background.

## Colors
The palette is inspired by the landscape of growth and the architecture of stability. 
- **Primary (Emerald):** Used for primary actions, progress indicators, and active states. It represents vitality and the act of "Birr" (charity/goodness).
- **Secondary (Deep Blue):** Reserved for headers, sidebars, and grounding elements to instill a sense of institutional trust.
- **Backgrounds:** Utilize the tertiary off-white for main surfaces to reduce eye strain, while the secondary color provides contrast for navigation.
- **Semantic Colors:** Bright and distinct to ensure immediate recognition of system status (Success, Warning, Danger).

## Typography
This design system uses **IBM Plex Sans Arabic** to achieve a modern, technical yet friendly appearance. 
- **RTL Optimization:** Special attention is paid to line heights to accommodate the ascenders and descenders of Arabic script without clipping.
- **Hierarchy:** Use `display` for hero numbers (e.g., total donations), `headline` for section titles, and `body` for long-form descriptions.
- **Weight:** Bold weights are used sparingly for emphasis; the medium weight is the default for labels to ensure legibility against light backgrounds.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for Desktop-first optimization, ensuring a consistent dashboard experience.
- **Grid:** A 12-column grid system with a maximum container width of 1440px.
- **Rhythm:** An 8px linear scale is used for all internal component spacing (padding/margins).
- **Adaptation:** On tablets, the 48px margins reduce to 24px. On mobile, the grid collapses to a single column with 16px margins, and complex tables transition to card-based views.

## Elevation & Depth
Hierarchy is established through **Tonal Layers** and subtle **Ambient Shadows**. 
- **Level 0 (Base):** Background color (`#F8FAFC`).
- **Level 1 (Cards/Forms):** White surfaces with a soft, 4% opacity neutral shadow to lift them slightly from the base.
- **Level 2 (Modals/Popovers):** Higher elevation with a 12% opacity shadow and a 1px soft border in `#E2E8F0` for definition.
- **Depth Metaphor:** Surfaces are treated as physical paper layers; when an item is "active" or "hovered," its shadow deepens slightly rather than changing color.

## Shapes
A **Rounded** language is applied throughout the design system to evoke a friendly and approachable feel. 
- Standard buttons and input fields use `0.5rem` (8px).
- Large containers and cards use `rounded-lg` (16px) to soften the professional edges of the dashboard.
- Interactive tags and status chips use the pill shape (`3`) to differentiate them from actionable buttons.

## Components
- **Buttons:** Primary buttons use the Emerald Green with white text. Secondary buttons use a transparent background with an Emerald border.
- **Cards:** White background, `rounded-lg` corners, and a 1px border in a lighter shade of the neutral color. Padding is consistently `24px`.
- **Forms:** Input fields use a subtle grey fill that turns white on focus with a 2px Emerald border. Labels are always positioned above the input for RTL clarity.
- **Tables:** Minimalist rows with thin horizontal dividers. The header row uses a light tint of the secondary blue (`#F1F5F9`) to separate data from the UI frame.
- **Sidebar:** A dark themed sidebar using the Secondary color (`#1E293B`). Active states are indicated by an Emerald vertical bar on the right side of the menu item.
- **Alerts:** Full-width or toast style. They use a light background tint of their semantic color with a high-contrast left-border (RTL) to draw immediate attention.