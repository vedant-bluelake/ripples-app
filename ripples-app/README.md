# Ripples App (Demo)

React Native + Expo Router demo of the Ripples mobile app with 4 themed screens (Home, Baskets, Portfolio, Profile).

## Run locally

```bash
npm install
npx expo start
```

Then press:
- `i` for iOS simulator (macOS + Xcode)
- `a` for Android emulator
- Scan QR with **Expo Go** app on your phone

## Structure

```
app/
  _layout.tsx          # Root stack
  (tabs)/
    _layout.tsx        # Bottom tabs
    index.tsx          # Home
    baskets.tsx        # MF Baskets
    portfolio.tsx      # Portfolio
    profile.tsx        # Profile
components/Header.tsx  # Logo + title bar
constants/theme.ts     # Color tokens (navy + gold)
assets/logo.png        # Ripples logo
```

## Next steps (yours)

- Wire backend (auth, holdings API)
- Add real charts (e.g. `react-native-svg-charts` / `victory-native`)
- Onboarding / KYC flow


## To Run the application on Local System

- $env:REACT_NATIVE_PACKAGER_HOSTNAME="10.58.65.57" (Systems IP shall be replaced here.)
- npx expo start --clear
