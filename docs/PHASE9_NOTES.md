Phase 9 polish pass

- Fixed theme consistency by wiring NativeWind colors to runtime theme variables, so light mode now affects pre-login, investor, CP, and shared components instead of only the bottom tabs.
- Reworked high-impact hardcoded dark colors on Investor Home, CP Create Basket, Tutorial Overlay, risk modal, basket cards, basket detail, fund detail, and partner detail.
- Restored the animated portfolio chart sheen on Investor Home using a looping native animation.
- Updated Investor Home Top Performers / Top Losers rails to match the designed richer data-card format with 1Y / 3Y / 5Y metrics and proper product glyphs.
- Fixed Marketplace basket navigation so tapping a marketplace basket opens its basket detail directly instead of first opening the Certified Partner profile.
- Tightened investor and CP bottom bars. CP now uses the raised circular gold Create button, compact labels, active dots, and safe-area-aware bottom padding matching the supplied reference.
- Improved detail-screen contrast and safe-area spacing for individual baskets, funds, and partner views.

Run:
1. npm install
2. npx expo start