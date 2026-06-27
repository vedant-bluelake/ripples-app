import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { vars } from "nativewind";
import { View } from "react-native";
import { colors } from "./tokens";

export type Mode = "dark" | "light";

const DARK = vars({
  "--background": colors.dark.background,
  "--foreground": colors.dark.foreground,
  "--card": colors.dark.card,
  "--secondary": colors.dark.secondary,
  "--muted": colors.dark.muted,
  "--muted-foreground": colors.dark.mutedForeground,
  "--border": colors.dark.border,
  "--primary": colors.brand.gold,
  "--primary-foreground": colors.dark.background,
  "--accent": colors.brand.gold,
  "--accent-foreground": colors.dark.background,
  "--gold": colors.brand.gold,
  "--gold-light": colors.brand.goldLight,
  "--gold-dark": colors.brand.goldDark,
  "--success": colors.brand.success,
  "--loss": colors.brand.loss,
  "--navy": colors.dark.navy,
  "--navy-light": colors.dark.navyLight,
});
const LIGHT = vars({
  "--background": colors.light.background,
  "--foreground": colors.light.foreground,
  "--card": colors.light.card,
  "--secondary": colors.light.secondary,
  "--muted": colors.light.muted,
  "--muted-foreground": colors.light.mutedForeground,
  "--border": colors.light.border,
  "--primary": colors.brand.gold,
  "--primary-foreground": colors.light.background,
  "--accent": colors.brand.gold,
  "--accent-foreground": colors.light.background,
  "--gold": colors.brand.gold,
  "--gold-light": colors.brand.goldLight,
  "--gold-dark": colors.brand.goldDark,
  "--success": colors.brand.success,
  "--loss": colors.brand.loss,
  "--navy": colors.light.navy,
  "--navy-light": colors.light.navyLight,
});

type Ctx = { mode: Mode; toggle: () => void };
const ThemeCtx = createContext<Ctx>({ mode: "dark", toggle: () => {} });
export const useTheme = () => useContext(ThemeCtx);
export const useThemeColors = () => {
  const { mode } = useTheme();
  const palette = mode === "dark" ? colors.dark : colors.light;
  return {
    mode,
    ...palette,
    gold: colors.brand.gold,
    goldLight: colors.brand.goldLight,
    goldDark: colors.brand.goldDark,
    success: colors.brand.success,
    loss: colors.brand.loss,
    overlay: mode === "dark" ? "rgba(31,35,48,0.95)" : "rgba(248,249,251,0.96)",
    goldTint: "rgba(136,121,79,0.16)",
    goldTintSoft: "rgba(136,121,79,0.07)",
    successTint: "rgba(52,194,107,0.15)",
    lossTint: "rgba(229,75,75,0.15)",
  };
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("dark");
  useEffect(() => {
    AsyncStorage.getItem("ripples_theme").then((v) => v === "light" && setMode("light"));
  }, []);
  const toggle = () => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    AsyncStorage.setItem("ripples_theme", next);
  };
  return (
    <ThemeCtx.Provider value={{ mode, toggle }}>
      <View style={mode === "dark" ? DARK : LIGHT} className="flex-1">
        {children}
      </View>
    </ThemeCtx.Provider>
  );
}
