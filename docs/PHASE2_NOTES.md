# Phase 2 — Auth & Onboarding (complete)

Added screens (all 100% RN, no web shims):
- `app/index.tsx` — full role-picker landing (matches web `LandingScreen.tsx`)
- `app/auth/login.tsx` — email-first login with stage transition + Google + demo card
- `app/auth/signup.tsx` — OTP entry + password set, redirects to onboarding
- `app/onboarding/investor.tsx` — 3-step vertical stepper (KYC → Profile{personal,holding,nominee} → Financial{bank,fatca})
- `app/onboarding/cp.tsx` — 5-step horizontal stepper (Basic → Professional → Docs → Bank → T&C)

Shared form primitives:
- `src/components/forms/Field.tsx` — `Field`, `TInput`, `Segmented`, `Select` (matches the web look)

Auth demo flow:
- existing email `*@ripples.demo` → password stage
- any other email → /auth/signup OTP flow (any 6 digits) → onboarding → tabs

Next: Phase 3 — Investor core (Home / Baskets / BasketDetail / Marketplace / PartnerDetail).
