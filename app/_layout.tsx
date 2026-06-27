import "../global.css";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { Toaster } from "sonner-native";
import { AppProvider } from "@/context/AppContext";
import { ThemeProvider, useTheme, useThemeColors } from "@/theme/ThemeContext";

function ThemedStack() {
  const { mode } = useTheme();
  const t = useThemeColors();
  return (
    <>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: t.background } }} />
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppProvider>
            <BottomSheetModalProvider>
              <ThemedStack />
              <Toaster position="top-center" />
            </BottomSheetModalProvider>
          </AppProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
