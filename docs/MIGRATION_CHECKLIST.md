# Ripples — Web → React Native Migration Checklist

Tick each box as you complete the screen. Every screen must pass:
- [ ] Light + dark visual parity (side-by-side screenshot)
- [ ] All interactions working (taps, scroll, sheets, forms)
- [ ] Safe-area + keyboard handling
- [ ] No `console.warn` / Reanimated layout warnings

Primitive map (apply to every file):
```
div          → View
p/span/h*    → Text
button       → Pressable
img          → Image (expo-image)
input        → TextInput
onClick      → onPress
className    → className (NativeWind, unchanged)
lucide-react → lucide-react-native
localStorage → AsyncStorage
framer-motion→ moti / react-native-reanimated
```

---

## Phase 0 — Foundation
- [x] Expo SDK 51 + TS strict
- [x] NativeWind v4 + tailwind.config (gold/navy tokens)
- [x] Expo Router v3 file structure
- [x] AppContext ported (AsyncStorage)
- [x] Fonts: Poppins + Playfair Display
- [x] Root `_layout.tsx` with SafeArea, GestureHandler, Toaster
- [x] Logo + basket-icon assets copied

## Phase 1 — Shared components (`src/components/`)
| Web component                  | RN target                             | Done |
| ------------------------------ | ------------------------------------- | ---- |
| `TopBar.tsx`                   | `src/components/TopBar.tsx`           | [ ]  |
| `cp/CPTopBar.tsx`              | `src/components/cp/CPTopBar.tsx`      | [ ]  |
| `BottomNav.tsx`                | `app/(investor)/_layout.tsx` Tabs     | [ ]  |
| `cp/CPBottomNav.tsx`           | `app/(cp)/_layout.tsx` Tabs           | [ ]  |
| `TopActions.tsx`               | `src/components/TopActions.tsx`       | [ ]  |
| `OrderListView.tsx`            | `src/components/OrderListView.tsx`    | [ ]  |
| `PriceChart.tsx`               | victory-native rebuild                | [ ]  |
| `PhoneFrame.tsx`               | NOT ported (web-only preview shell)   | n/a  |
| `Shell` modal wrapper          | `@gorhom/bottom-sheet` wrapper        | [ ]  |
| `StatusPill`                   | `src/components/StatusPill.tsx`       | [ ]  |

## Phase 2 — Investor screens
Path is `app/(investor)/<file>.tsx` unless noted.

| Web file                            | RN route / file                        | Done |
| ----------------------------------- | -------------------------------------- | ---- |
| `LandingScreen.tsx`                 | `app/index.tsx`                        | [x]  |
| `LoginScreen.tsx`                   | `app/auth/login.tsx`                   | [ ]  |
| `SignupFlowScreen.tsx`              | `app/auth/signup.tsx`                  | [ ]  |
| `OnboardingScreen.tsx`              | `app/auth/onboarding.tsx`              | [ ]  |
| `HomeScreen.tsx`                    | `app/(investor)/home.tsx`              | [ ]  |
|   ↳ eye toggle (amount mask)        |                                        | [ ]  |
|   ↳ Top performers / losers tiles   |                                        | [ ]  |
|   ↳ LAS rename                      |                                        | [ ]  |
| `BasketsScreen.tsx`                 | `app/(investor)/baskets.tsx`           | [ ]  |
| `BasketDetailScreen.tsx`            | `app/(investor)/basket/[id].tsx`       | [ ]  |
| `MarketplaceScreen.tsx`             | `app/(investor)/marketplace.tsx`       | [ ]  |
| `PartnerDetailScreen.tsx`           | `app/(investor)/partner/[id].tsx`      | [ ]  |
| `DIYScreen.tsx`                     | `app/(investor)/diy.tsx`               | [ ]  |
| `FundDetailScreen.tsx`              | `app/(investor)/fund/[id].tsx`         | [ ]  |
| `MyOrdersScreen.tsx`                | `app/(investor)/orders.tsx`            | [ ]  |
| `NotificationsScreen.tsx`           | `app/(investor)/notifications.tsx`     | [ ]  |
| `CartScreen.tsx`                    | `app/(investor)/cart.tsx`              | [ ]  |
| `WishlistScreen.tsx`                | `app/(investor)/wishlist.tsx`          | [ ]  |
| `AddToCartModal.tsx`                | bottom-sheet component                 | [ ]  |
| `ConciergeScreen.tsx`               | `app/(investor)/concierge.tsx`         | [ ]  |
| `ConciergeModal.tsx`                | bottom-sheet                           | [ ]  |
| `RiskProfileModal.tsx`              | bottom-sheet                           | [ ]  |
| `ProfileScreen.tsx`                 | `app/(investor)/profile.tsx`          *(full screen — no top bar)* | [ ]  |
| `MandateModals.tsx` (Create+Status) | bottom-sheets                          | [ ]  |
| `SwitchAccountScreen.tsx`           | `app/(investor)/switch-account.tsx`    | [ ]  |
| `TutorialOverlay.tsx`               | Reanimated MaskedView spotlight        | [ ]  |

## Phase 3 — Certified Partner screens
Path is `app/(cp)/<file>.tsx`. CP top bar shows on every screen *except* profile.

| Web file                       | RN route                       | Done |
| ------------------------------ | ------------------------------ | ---- |
| `cp/CPOnboardingScreen.tsx`    | `app/auth/cp-onboarding.tsx`   | [ ]  |
| `cp/CPDashboardScreen.tsx`     | `app/(cp)/dashboard.tsx`       | [ ]  |
| `cp/CPCreateBasketScreen.tsx`  | `app/(cp)/create.tsx`          | [ ]  |
| `cp/CPMyBasketsScreen.tsx`     | `app/(cp)/baskets.tsx`         | [ ]  |
| `cp/CPRewardsScreen.tsx`       | `app/(cp)/rewards.tsx`         | [ ]  |
| `cp/CPProfileScreen.tsx`       | `app/(cp)/profile.tsx`         | [ ]  |

## Phase 4 — Polish & parity QA
- [ ] Haptics on primary CTAs (invest, add to cart, sheet open)
- [ ] All scroll views use `keyboardShouldPersistTaps="handled"`
- [ ] Pull-to-refresh on Home, Orders, Baskets, Marketplace
- [ ] Skeleton loaders match web shimmer
- [ ] Light theme verified on every screen
- [ ] Accessibility labels on every Pressable
- [ ] iOS notch + Android nav bar verified

## Phase 5 — Release
- [ ] App icons (1024 iOS, adaptive Android)
- [ ] Splash screen finalized (`expo-splash-screen`)
- [ ] `eas.json` with `development` / `preview` / `production`
- [ ] EAS Build → TestFlight internal
- [ ] EAS Build → Play Internal Testing
- [ ] Store listings (screenshots, description, privacy URL)
- [ ] EAS Submit → App Store
- [ ] EAS Submit → Play Store
- [ ] OTA update channel wired (`expo-updates`)

---

## Per-screen porting recipe

For each row above, run this loop:

1. **Read the web source** at `../src/components/screens/<Name>.tsx`.
2. **Create the RN file** at the mapped path.
3. **Convert primitives** using the map at the top of this file.
4. **Keep className identical** — NativeWind accepts the same tokens (`bg-gold`, `text-muted-foreground`, `rounded-2xl`, etc.).
5. **Replace icon import** path only — names stay the same.
6. **Wire navigation**: replace `onTab/setOverlay` callbacks with `router.push("/(investor)/...")`.
7. **Replace overlays** with `@gorhom/bottom-sheet`.
8. **Screenshot diff**: open the web preview at 390×844, open the iOS sim, place side-by-side, fix spacing/typography drifts.
9. **Test on Android**: spot-check shadows, font weights, ripples (`android_ripple` on Pressable).
10. **Tick the box** above and commit.

## Definition of done

- All boxes above ticked.
- App passes `expo lint` with no errors.
- App boots on iOS sim, Android emulator, and Expo Go on a real device.
- EAS preview build installed via TestFlight / Play Internal Testing.
