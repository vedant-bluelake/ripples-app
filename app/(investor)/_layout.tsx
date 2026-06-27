import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, Layers, Store, SlidersHorizontal, Sparkles } from "lucide-react-native";
import { useThemeColors } from "@/theme/ThemeContext";

export default function InvestorLayout() {
  const t = useThemeColors();
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 8);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: t.gold,
        tabBarInactiveTintColor: t.mutedForeground,
        tabBarLabelStyle: { fontSize: 9, fontWeight: "500", marginTop: -3 },
        tabBarIconStyle: { marginBottom: -4 },
        tabBarItemStyle: { paddingVertical: 2 },
        tabBarStyle: { backgroundColor: t.background, borderTopColor: t.border, height: 50 + bottom, paddingTop: 3, paddingBottom: bottom },
      }}
    >
      <Tabs.Screen name="home"        options={{ title: "Home",        tabBarIcon: ({ color }) => <Home size={16} color={color} /> }} />
      <Tabs.Screen name="baskets"     options={{ title: "Baskets",     tabBarIcon: ({ color }) => <Layers size={16} color={color} /> }} />
      <Tabs.Screen name="marketplace" options={{ title: "Marketplace", tabBarIcon: ({ color }) => <Store size={16} color={color} /> }} />
      <Tabs.Screen name="diy"         options={{ title: "DIY",         tabBarIcon: ({ color }) => <SlidersHorizontal size={16} color={color} /> }} />
      <Tabs.Screen name="concierge"   options={{ title: "Concierge",   tabBarIcon: ({ color }) => <Sparkles size={16} color={color} /> }} />
    </Tabs>
  );
}
