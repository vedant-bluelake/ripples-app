import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LayoutDashboard, Plus, Layers, Trophy, User } from "lucide-react-native";
import { useThemeColors } from "@/theme/ThemeContext";

export default function CPLayout() {
  const t = useThemeColors();
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 8);
  const icon = (Icon: typeof Plus) => ({ color, focused }: { color: string; focused: boolean }) => (
    <View style={{ alignItems: "center", gap: 2, height: 23 }}>
      <Icon size={16} color={color} />
      {focused && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: t.gold }} />}
    </View>
  );
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: t.gold,
        tabBarInactiveTintColor: t.mutedForeground,
        tabBarLabelStyle: { fontSize: 9, fontWeight: "500", marginTop: -2 },
        tabBarIconStyle: { marginBottom: -4 },
        tabBarItemStyle: { paddingVertical: 0 },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: t.background,
          borderTopColor: t.border,
          borderTopWidth: 1,
          height: 52 + bottom,
          paddingTop: 5,
          paddingBottom: bottom,
        },
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Home",    tabBarIcon: icon(LayoutDashboard) }} />
      <Tabs.Screen name="create"    options={{ title: "Create",  tabBarIcon: () => <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: t.gold, borderWidth: 3, borderColor: t.background, alignItems: "center", justifyContent: "center", marginTop: -26, shadowColor: t.gold, shadowOpacity: 0.28, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 6 }}><Plus size={22} color={t.background} /></View>, tabBarLabel: ({ focused }) => <Text style={{ fontSize: 9, fontWeight: "500", color: focused ? t.gold : t.mutedForeground, marginTop: -4 }}>Create</Text> }} />
      <Tabs.Screen name="baskets"   options={{ title: "Baskets", tabBarIcon: icon(Layers) }} />
      <Tabs.Screen name="rewards"   options={{ title: "Rewards", tabBarIcon: icon(Trophy) }} />
      <Tabs.Screen name="profile"   options={{ title: "Profile", tabBarIcon: icon(User) }} />
    </Tabs>
  );
}
