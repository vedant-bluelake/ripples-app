import { useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ChevronRight, Shield, HelpCircle, LogOut, Settings, Repeat, FilePlus2, FileCheck2,
  Sun, Moon, Receipt, PlayCircle, Bell, ArrowLeft, ChevronDown,
} from "lucide-react-native";
import { useTheme, useThemeColors } from "@/theme/ThemeContext";
import { useApp } from "@/context/AppContext";

const GOLD = "#88794F";
const LOSS = "#E54B4B";
const SUCCESS = "#34C26B";

export default function ProfileScreen() {
  const router = useRouter();
  const { mode, toggle } = useTheme();
  const t = useThemeColors();
  const insets = useSafeAreaInsets();
  const { resetTutorial } = useApp();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const menu: { Icon: any; label: string; desc: string; onPress?: () => void }[] = [
    { Icon: Receipt, label: "My Orders", desc: "Baskets, Marketplace & DIY", onPress: () => router.push("/orders") },
    { Icon: Repeat, label: "Switch Accounts", desc: "Manage your investment profiles", onPress: () => router.push("/switch-account") },
    { Icon: FilePlus2, label: "Create Mandate", desc: "Set up auto-debit for SIPs", onPress: () => router.push("/mandate/create") },
    { Icon: FileCheck2, label: "Mandate Status", desc: "Track active & pending mandates", onPress: () => router.push("/mandate/status") },
    { Icon: PlayCircle, label: "Replay Tutorial", desc: "Walk through the app again", onPress: () => { resetTutorial(); router.replace("/(investor)/home"); } },
    { Icon: HelpCircle, label: "Help & Support", desc: "FAQs, contact us" },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.background }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: Math.max(insets.bottom, 12) + 40, paddingTop: insets.top + 8 }}>
      <View className="flex-row items-center justify-between pb-4">
        <View className="flex-row items-center" style={{ gap: 8 }}>
          <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Go back"><ArrowLeft size={16} color={t.mutedForeground} /></Pressable>
          <Text className="text-lg font-bold text-foreground">Profile</Text>
        </View>
        <Pressable
          onPress={() => router.push("/notifications")}
          className="w-9 h-9 rounded-full bg-secondary border border-border items-center justify-center"
        >
          <Bell size={16} color={t.foreground} />
          <View style={{ position: "absolute", top: 6, right: 6, width: 6, height: 6, borderRadius: 3, backgroundColor: GOLD }} />
        </Pressable>
      </View>

      {/* User card */}
      <View className="flex-row items-center bg-secondary rounded-2xl p-4 mb-5 border border-border/60" style={{ gap: 12 }}>
        <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: GOLD, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#1F2330" }}>RS</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text className="text-sm font-bold text-foreground">Rahul Sharma</Text>
          <Text className="text-[10px] text-muted-foreground">rahul.sharma@email.com</Text>
          <View className="flex-row items-center mt-1" style={{ gap: 4 }}>
            <Shield size={10} color={SUCCESS} />
            <Text style={{ fontSize: 9, color: SUCCESS, fontWeight: "500" }}>KYC Verified</Text>
          </View>
        </View>
        <ChevronRight size={16} color={t.mutedForeground} />
      </View>

      <View>
        {menu.map((it) => (
          <Pressable key={it.label} onPress={it.onPress} className="flex-row items-center py-3" style={{ gap: 12 }}>
            <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: t.secondary, alignItems: "center", justifyContent: "center" }}>
              <it.Icon size={16} color={t.mutedForeground} />
            </View>
            <View style={{ flex: 1 }}>
              <Text className="text-xs font-medium text-foreground">{it.label}</Text>
              <Text className="text-[9px] text-muted-foreground">{it.desc}</Text>
            </View>
            <ChevronRight size={14} color={t.mutedForeground} />
          </Pressable>
        ))}

        {/* Settings collapsible */}
        <View>
          <Pressable onPress={() => setSettingsOpen((v) => !v)} className="flex-row items-center py-3" style={{ gap: 12 }}>
            <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: t.secondary, alignItems: "center", justifyContent: "center" }}>
              <Settings size={16} color={t.mutedForeground} />
            </View>
            <View style={{ flex: 1 }}>
              <Text className="text-xs font-medium text-foreground">Settings</Text>
              <Text className="text-[9px] text-muted-foreground">Appearance, language & more</Text>
            </View>
            <ChevronDown size={14} color={t.mutedForeground} style={{ transform: [{ rotate: settingsOpen ? "180deg" : "0deg" }] }} />
          </Pressable>
          {settingsOpen && (
            <View className="ml-12 mr-1 mb-2 bg-secondary border border-border/60 rounded-xl p-3 flex-row items-center justify-between">
              <View style={{ flex: 1 }}>
                <Text className="text-[11px] font-semibold text-foreground">Appearance</Text>
                <Text className="text-[9px] text-muted-foreground">Choose light or dark theme</Text>
              </View>
              <View className="flex-row items-center bg-background border border-border rounded-full p-0.5">
                <Pressable onPress={() => mode !== "light" && toggle()}
                  style={{ flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: mode === "light" ? GOLD : "transparent" }}>
                  <Sun size={12} color={mode === "light" ? t.background : t.mutedForeground} />
                  <Text style={{ fontSize: 10, fontWeight: "500", color: mode === "light" ? t.background : t.mutedForeground }}>Light</Text>
                </Pressable>
                <Pressable onPress={() => mode !== "dark" && toggle()}
                  style={{ flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: mode === "dark" ? GOLD : "transparent" }}>
                  <Moon size={12} color={mode === "dark" ? t.background : t.mutedForeground} />
                  <Text style={{ fontSize: 10, fontWeight: "500", color: mode === "dark" ? t.background : t.mutedForeground }}>Dark</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </View>

      <Pressable onPress={() => router.replace("/")} className="flex-row items-center py-3 mt-2" style={{ gap: 12 }}>
        <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(229,75,75,0.10)", alignItems: "center", justifyContent: "center" }}>
          <LogOut size={16} color={LOSS} />
        </View>
        <Text style={{ fontSize: 12, fontWeight: "500", color: LOSS }}>Log Out</Text>
      </Pressable>

      <Text className="text-center text-[9px] text-muted-foreground mt-4">RIPPLES™ v2.1.0 · Blue Lake Capital™</Text>
    </ScrollView>
  );
}
