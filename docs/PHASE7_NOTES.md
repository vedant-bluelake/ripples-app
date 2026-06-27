# Phase 7 — Polish Pass

## Changes from phase 6

### 1. CP top bar redesign (`src/components/cp/CPTopBar.tsx`)
- Removed full Ripples wordmark.
- Single row: cropped logo mark (`basket-icon.png`) + page header on the left,
  `Certified Partner` badge on the right.
- Safe-area inset applied via `useSafeAreaInsets().top + 8` so the header no longer
  sits under the device notch / status bar.

### 2. Investor top bar safe-area (`src/components/TopBar.tsx`)
- Now uses `useSafeAreaInsets()` for top padding. Greeting + RS avatar clear the
  notch / status icons on every device.

### 3. Tutorial overlay fixes (`src/components/TutorialOverlay.tsx`)
- Close (X) button now positioned with `insets.top + 12` and `zIndex: 10` so it is
  reachable on notched devices and never trapped behind the dim layer.

### 4. Home alignment (`app/(investor)/home.tsx`)
- Tightened gap between hero portfolio card and quick-action tiles
  (marginBottom 20 → 12, marginTop 12 → 8). Removes the visible empty band.

## Known limitations carried forward
- **Light theme parity**: investor home, CP screens, and several detail screens
  still use hard-coded hex constants (`BG`, `SURFACE`, `TEXT`) rather than the
  NativeWind theme variables. The bottom-nav and CPTopBar follow the theme, but
  page bodies stay dark in light mode. A full sweep replacing the constants with
  `useTheme()` tokens is queued for a follow-up.
- **CP screen redesign**: structural parity with the web reference (2×2 metric
  grid, wizard stepper styling, segmented controls) is partial. The new CPTopBar
  lands now; deeper layout reskin is queued.

## Setup
```bash
unzip ripples-mobile-phase7.zip
cd ripples-mobile
npm install
npx expo start
```
