# Phase 5 — Profile, Mandate Modals, Tutorial Overlay, CP Suite

This phase completes the secondary investor surfaces and the full Certified
Partner experience.

## New screens

### Investor
- `app/profile.tsx` — Profile hub: KYC chip, menu (Orders, Switch Accounts,
  Create / Status Mandate, Replay Tutorial, Help), expandable Settings with
  light/dark toggle, logout.
- `app/switch-account.tsx` — Manage multiple folios (Single / Joint, holders,
  nominees). Active selection, incomplete onboarding state, "Create New
  Account" CTA.
- `app/mandate/create.tsx` — Bottom-sheet style screen to request a new
  e-mandate (amount, start / end). Submits via `sonner-native` toast.
- `app/mandate/status.tsx` — Lists Active / Pending / Expired / Failed
  mandates with UMRN, period, bank.

### Certified Partner (full implementations replacing Phase 1 stubs)
- `app/(cp)/dashboard.tsx` — Lifetime earnings + AUM hero, 6 metric tiles
  (baskets, clients, ratings, tier), compliance disclosure card.
- `app/(cp)/create.tsx` — 5-step basket builder (Risk → Profile → Strategy
  → Funds + Allocation → Name) with sticky footer, validation,
  reset & publish toast.
- `app/(cp)/baskets.tsx` — My Baskets list with Live / In-Review pills,
  5Y returns, client count, "New" shortcut to the wizard.
- `app/(cp)/rewards.tsx` — Tier card with progress bar, performance metrics
  grid, point structure table, ARN disclaimer.
- `app/(cp)/profile.tsx` — CP profile card with theme switcher, credentials
  & earnings menu, logout.

## New components
- `src/components/TutorialOverlay.tsx` — Modal-based 9-step welcome tour.
  Auto-opens on the investor home until `markTutorialSeen()` (persisted via
  AsyncStorage). Replayable from Profile → Replay Tutorial.

## Integration changes
- `app/(investor)/home.tsx` now renders the `TutorialOverlay` until the user
  marks it seen.
- Investor profile menu wires Replay Tutorial → `resetTutorial()` +
  re-navigates to home.
