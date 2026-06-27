# Phase 10 — Pre-login polish & theme darkening

## Changes
- **Darker dark theme** to match web designs (`tokens.ts`):
  - background `#1F2330` → `#141720`
  - card `#262B3A` → `#1B1F2C`
  - secondary `#2A2F3E` → `#1F2330`
  - border `#3A3F50` → `#2E3344`
- **Landing (`app/index.tsx`)**: ambient gold radial-style `LinearGradient` anchored to top (no gap with safe-area), Investor card uses true gradient (matches web `from-gold/30 to-gold/10`).
- **Login (`app/auth/login.tsx`)**: ambient top gradient, real multi-color **Google "G"** SVG (replaces 🅖 emoji fallback).
- **Signup**: matching ambient top gradient.
- **Switch Account**: mapped-partner card upgraded to gold LinearGradient with ARN pill.
- **Logo HD**: `assets/basket-icon.png` regenerated at 512×512 (was 32×32 — source of the blur).
- **New component**: `src/components/icons/GoogleIcon.tsx` (react-native-svg).

## Cumulative deliverable
`ripples-mobile-phase10.zip`