/**
 * Design tokens — ported from web `src/styles.css`.
 * Single source of truth for both NativeWind theme and inline style usage.
 */
export const colors = {
  dark: {
    background: "#141720",
    foreground: "#F5F6FA",
    card: "#1B1F2C",
    secondary: "#1F2330",
    muted: "#252A38",
    mutedForeground: "#9AA1B2",
    border: "#2E3344",
    navy: "#1B1F2C",
    navyLight: "#252A38",
  },
  light: {
    background: "#F8F9FB",
    foreground: "#1E2230",
    card: "#FFFFFF",
    secondary: "#F1F2F6",
    muted: "#EAECF1",
    mutedForeground: "#6B7080",
    border: "#E1E3EA",
    navy: "#F8F9FB",
    navyLight: "#EFF1F5",
  },
  brand: {
    gold: "#88794F",
    goldLight: "#A89668",
    goldDark: "#6E6240",
    success: "#34C26B",
    loss: "#E54B4B",
  },
} as const;

export const radius = { sm: 6, md: 8, lg: 10, xl: 14, "2xl": 18, "3xl": 22 };

export const fonts = {
  sans: "Poppins_400Regular",
  sansBold: "Poppins_700Bold",
  display: "PlayfairDisplay_600SemiBold",
};
