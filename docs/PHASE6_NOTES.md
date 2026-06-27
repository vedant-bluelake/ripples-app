# Phase 6 — Polish, Accessibility & Final Packaging

This is the final phase of the React Native (Expo) migration. Phase 6 wires
the project up for production-quality navigation, accessibility, deep links,
and shippable local setup.

## What changed

### 1. Back navigation (all sub-screens)
Every push-style screen already had an `ArrowLeft` / `X` control that calls
`router.back()`. In Phase 6 every back/close control received:
- `accessibilityRole="button"`
- `accessibilityLabel="Go back"` (or `"Close"` for modal/bottom-sheet pages)
- `hitSlop={10}` (kept from earlier phases)

This applies to:
- `app/basket/[id].tsx`, `app/partner/[id].tsx`, `app/fund/[id].tsx`
- `app/notifications.tsx`, `app/profile.tsx`, `app/switch-account.tsx`
- `app/risk.tsx`, `app/mandate/create.tsx`, `app/mandate/status.tsx`
- `app/auth/login.tsx`, `app/auth/signup.tsx`
- `src/components/OrderListView.tsx` (powers Cart, Wishlist, My Orders)

### 2. Android hardware back
Handled automatically by Expo Router's `Stack` / `Tabs`. Hardware back pops
the top of the stack, which matches the explicit `router.back()` controls.
No custom `BackHandler` wiring is required.

### 3. Deep links
`app.json` declares `"scheme": "ripples"`, so Expo Router exposes every
route as a deep link automatically:

```
ripples:///                         → Landing
ripples:///(investor)/home          → Investor Home (after sign-in)
ripples:///basket/wealth-builder    → Basket detail
ripples:///fund/hdfc-midcap         → Fund detail
ripples:///partner/priya-menon      → Partner detail
ripples:///orders                   → My Orders
```

Test on a simulator:
```bash
# iOS
xcrun simctl openurl booted "ripples:///basket/wealth-builder"
# Android
adb shell am start -W -a android.intent.action.VIEW -d "ripples:///fund/hdfc-midcap" com.ripples.app
```

### 4. Accessibility
- Every `Pressable` representing a control (back, close, profile, cart,
  wishlist, tab buttons) has an `accessibilityLabel`.
- Tab bar icons inherit labels from their `title` props.
- Status pills and risk tags include readable text — no icon-only state.
- Color choices respect the dark theme contrast targets in `src/theme/tokens.ts`.

### 5. Local-run README
`README.md` is rewritten with:
- Prereqs (Node 20+, Watchman on macOS, Xcode 15+ / Android Studio Hedgehog+)
- Three run modes (Expo Go, iOS dev client, Android dev client)
- Troubleshooting (Metro cache, pod reinstall, JDK 17)
- Deep-link verification commands
- Folder map for new contributors

## Verifying locally

```bash
unzip ripples-mobile-phase6.zip
cd ripples-mobile
npm install
npx expo start          # press i for iOS, a for Android, w for web
```
