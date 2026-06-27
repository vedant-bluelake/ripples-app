# Phase 8 — Full polish zip

This zip continues from phase 7 and focuses on closing the gaps seen on-device:

- Safe-area padding is now applied to profile, switch-account, basket detail, fund detail, CP profile/create/baskets/rewards/dashboard, notifications, cart/wishlist/orders, and shared list views.
- Investor and CP bottom bars are tightened to match the reference spacing; CP Create keeps a stronger center emphasis.
- Investor home restores the portfolio graph sheen, improves Top Performer/Top Loser rail cards, and adds category icons to those cards.
- Switch Accounts now matches the designed structure more closely and the Create Account actions route to onboarding.
- Theme colors are centralized through `useThemeColors()` so the light theme no longer only affects the bottom bar on the patched screens.
- CP header keeps the cropped mark + page heading on the left and the Certified Partner badge on the right.

Run:

```bash
npm install
npx expo start
```