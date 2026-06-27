import { ScrollView, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronRight, Shield, HelpCircle, LogOut, Settings, FileText, Award,
  Sun, Moon, BadgeCheck, IndianRupee, Users,
} from "lucide-react-native";
import { useTheme, useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#88794F";
const LOSS = "#E54B4B";

const menu = [
  { Icon: BadgeCheck, label: "ARN & Credentials", desc: "ARN-123456 · EUIN E12345" },
  { Icon: Users, label: "My Clients", desc: "26 personal · 48 marketplace" },
  { Icon: IndianRupee, label: "Earnings & Payouts", desc: "Monthly trail income statements" },
  { Icon: FileText, label: "Documents & KYC", desc: "PAN, agreement, AMFI certs" },
  { Icon: Award, label: "Certifications", desc: "NISM, AMFI renewals" },
  { Icon: Settings, label: "Preferences", desc: "Notifications, language" },
  { Icon: Shield, label: "Compliance Center", desc: "SEBI, AMFI disclosures" },
  { Icon: HelpCircle, label: "Help & Support", desc: "Partner support desk" },
];

export default function CPProfileScreen() {
  const router = useRouter();
  const { mode, toggle } = useTheme();
  const t = useThemeColors();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.background }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: Math.max(insets.bottom, 12) + 40, paddingTop: insets.top + 8 }}>
      <View className="pt-4 pb-4 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-foreground">My Profile</Text>
        <View className="flex-row items-center bg-secondary border border-border rounded-full p-0.5">
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

      {/* CP card */}
      <View className="rounded-2xl overflow-hidden border border-gold/30">
        <LinearGradient colors={["rgba(136,121,79,0.22)", "rgba(136,121,79,0.06)", "transparent"]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ padding: 16 }}>
          <View className="flex-row items-center" style={{ gap: 12 }}>
            <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: GOLD, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: t.background }}>PA</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text className="text-sm font-bold text-foreground">Padma Aiyer</Text>
              <Text className="text-[10px] text-muted-foreground">padma@padmacapital.in</Text>
              <View style={{ alignSelf: "flex-start", marginTop: 4, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999, backgroundColor: "rgba(136,121,79,0.20)" }}>
                <Text style={{ fontSize: 8, fontWeight: "500", color: GOLD }}>Silver · Certified Partner</Text>
              </View>
            </View>
          </View>
          <View className="flex-row mt-4 pt-3 border-t border-border/40">
            {[["AUM", "₹12.4 Cr"], ["Experience", "14 yrs"], ["Rating", "4.9★"]].map((s) => (
              <View key={s[0]} style={{ flex: 1, alignItems: "center" }}>
                <Text className="text-[9px] text-muted-foreground">{s[0]}</Text>
                <Text className="text-xs font-bold text-foreground">{s[1]}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>

      <View className="bg-secondary rounded-2xl border border-border/60 mt-4 overflow-hidden">
        {menu.map((it, i) => (
          <Pressable key={it.label} className="flex-row items-center p-3.5" style={{ gap: 12, borderTopWidth: i === 0 ? 0 : 1, borderColor: t.border }}>
            <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: t.background, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: t.border }}>
              <it.Icon size={14} color={GOLD} />
            </View>
            <View style={{ flex: 1 }}>
              <Text className="text-xs font-semibold text-foreground">{it.label}</Text>
              <Text className="text-[10px] text-muted-foreground">{it.desc}</Text>
            </View>
            <ChevronRight size={14} color={t.mutedForeground} />
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => router.replace("/")}
        className="mt-4 flex-row items-center justify-center rounded-xl py-3"
        style={{ gap: 8, backgroundColor: "rgba(229,75,75,0.10)", borderWidth: 1, borderColor: "rgba(229,75,75,0.30)" }}
      >
        <LogOut size={14} color={LOSS} />
        <Text style={{ fontSize: 12, fontWeight: "700", color: LOSS }}>Logout</Text>
      </Pressable>

      <Text className="text-center text-[9px] text-muted-foreground mt-4">Blue Lake Capital™ · Partner App v1.0</Text>
    </ScrollView>
  );
}
