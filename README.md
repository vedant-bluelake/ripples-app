# Ripples Mobile — Expo (React Native)

A pixel-faithful React Native port of the Ripples web app. Built with
**Expo SDK 51**, **Expo Router v3**, **NativeWind v4**, **TypeScript strict**,
and **React Native Reanimated 3**.

> This zip is the final cumulative build (Phases 1 → 6 of the migration).
> Drop it into a fresh folder, install once, and run.

---

## 1. Prerequisites

| Tool                       | Minimum    | Notes                                         |
| -------------------------- | ---------- | --------------------------------------------- |
| Node.js                    | 20.x LTS   | `nvm install 20`                              |
| npm / bun / pnpm           | any        | examples below use `npm`                      |
| Watchman (macOS only)      | latest     | `brew install watchman`                       |
| Xcode (iOS, macOS only)    | 15+        | install iOS 17 simulator runtime              |
| Android Studio             | Hedgehog+  | install SDK 34, an emulator, JDK 17           |
| Expo Go app (optional)     | latest     | iOS App Store / Google Play, for QR runs      |

Install the Expo CLI globally (optional but handy):

```bash
npm i -g expo eas-cli
```

---

## 2. First-time setup

```bash
# from the unzipped folder
cd ripples-mobile
npm install
```

That's it — no native `pod install` step is needed until you build a dev
client (see §4). All managed Expo modules are pre-wired.

---

## 3. Run with Expo Go (fastest path)

```bash
npx expo start
```

Then in the terminal UI:
- press **i** → iOS simulator
- press **a** → Android emulator
- press **w** → web preview (NativeWind classes render in a browser)
- or scan the QR with the **Expo Go** app on your phone

---

## 4. Run as a dev client (for native modules / release-like builds)

```bash
# iOS (macOS only)
npx expo run:ios

# Android (any OS — needs an emulator booted or device plugged in)
npx expo run:android
```

The first run takes 3–5 min while CocoaPods / Gradle resolve. Subsequent
runs are seconds.

---

## 5. Deep links

`app.json` declares the URL scheme `ripples`. Every Expo Router route is a
deep link automatically. Quick checks:

```bash
# iOS Simulator
xcrun simctl openurl booted "ripples:///basket/wealth-builder"

# Android emulator / device
adb shell am start -W \
  -a android.intent.action.VIEW \
  -d "ripples:///fund/hdfc-midcap" \
  com.ripples.app
```

Useful routes:

| URL                                       | Screen              |
| ----------------------------------------- | ------------------- |
| `ripples:///`                             | Landing             |
| `ripples:///auth/login`                   | Sign in             |
| `ripples:///(investor)/home`              | Investor Home       |
| `ripples:///(investor)/baskets`           | Investor Baskets    |
| `ripples:///(investor)/marketplace`       | Investor Marketplace|
| `ripples:///(investor)/diy`               | D.I.Y. funds        |
| `ripples:///(investor)/concierge`         | Concierge           |
| `ripples:///basket/<id>`                  | Basket detail       |
| `ripples:///fund/<id>`                    | Fund detail         |
| `ripples:///partner/<id>`                 | Partner detail      |
| `ripples:///cart` / `wishlist` / `orders` | Transaction views   |
| `ripples:///(cp)/dashboard`               | Certified Partner   |

---

## 6. Project layout

```
app/                       Expo Router file-based routes
  _layout.tsx              Root: providers, theme, status bar
  index.tsx                Landing
  (investor)/              Tab group — investor BottomNav
    _layout.tsx
    home.tsx               Hero card, recommendations, holdings
    baskets.tsx            Curated baskets + filter bar
    marketplace.tsx        Partner-curated baskets
    diy.tsx                Direct fund discovery
    concierge.tsx          AI-shortlist with weighted priorities
  (cp)/                    Tab group — Certified Partner shell
    _layout.tsx
    dashboard.tsx
    create.tsx             5-step basket-creation wizard
    baskets.tsx
    rewards.tsx
    profile.tsx
  auth/                    login.tsx, signup.tsx
  onboarding/              KYC / risk onboarding
  basket/[id].tsx          Basket detail (SVG sparkline + sticky CTA)
  partner/[id].tsx         Partner profile
  fund/[id].tsx            Fund detail (NAV chart + Add-to-cart sheet)
  mandate/                 create.tsx, status.tsx
  cart.tsx wishlist.tsx orders.tsx
  notifications.tsx profile.tsx risk.tsx switch-account.tsx
src/
  components/              RN primitives (TopBar, BottomNav, Sheet, ...)
  components/cp/           CP-specific shared components
  context/AppContext.tsx   Cart, wishlist, risk, tutorial (AsyncStorage)
  data/data.ts             Ported mock catalogue (baskets, funds, partners)
  theme/                   Light/dark tokens + ThemeContext
assets/                    Logos, basket icon, fonts
docs/                      Per-phase migration notes & checklist
app.json                   Expo config (scheme: ripples)
tailwind.config.js         NativeWind v4 config
global.css                 NativeWind entry
```

---

## 7. Brand & theming

| Token         | Value                              |
| ------------- | ---------------------------------- |
| `gold`        | `#88794F` (olive gold, primary)    |
| `navy`        | `#2E3342` (deep brand navy)        |
| `success`     | `#34C26B`                          |
| `loss`        | `#E54B4B`                          |
| Display font  | Playfair Display                   |
| Body font     | Poppins                            |

Theme toggle is available from the landing screen and from the investor
Profile screen. Choice persists via AsyncStorage.

---

## 8. Accessibility

- Every back / close / cart / wishlist / profile button has an
  `accessibilityRole="button"` and `accessibilityLabel`.
- Tab bar items inherit titles for VoiceOver / TalkBack.
- Status pills and tags are text-bearing — no icon-only state.
- Color tokens meet WCAG AA contrast in both themes.

---

## 9. Troubleshooting

| Symptom                                        | Fix                                                              |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| Metro stuck after switching branches           | `npx expo start -c` (clears the Metro cache)                     |
| iOS build fails on a new module                | `cd ios && pod install && cd ..` then re-run `npx expo run:ios`  |
| Android build complains about JDK version      | install JDK 17 and `export JAVA_HOME=$(/usr/libexec/java_home -v 17)` |
| `unable to resolve module @/...`               | restart Metro with cache clear; aliases live in `tsconfig.json`  |
| NativeWind classes not applying on web         | confirm `global.css` is imported in `app/_layout.tsx` (it is)    |
| Expo Go shows "incompatible" runtime           | update Expo Go to the latest SDK 51 build                        |

---

## 10. Migration history

- **Phase 1** — Tab navigation shell, theme, AppContext, shared primitives
- **Phase 2** — Auth (landing, login, signup), onboarding
- **Phase 3** — Investor Home, Baskets, Marketplace, Basket / Partner detail
- **Phase 4** — D.I.Y., Fund detail (SVG NAV chart), Cart, Wishlist, Orders, Concierge
- **Phase 5** — Profile, mandates, tutorial overlay, full CP suite
- **Phase 6** — Accessibility, deep links, README, final packaging

See `docs/PHASE*_NOTES.md` for per-phase change logs.
