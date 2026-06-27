import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { X, Shield, Activity, TrendingUp, HelpCircle } from "lucide-react-native";
import { useApp, type RiskProfile } from "@/context/AppContext";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#C1A86B";

const profiles = [
  { key: "Conservative" as RiskProfile, icon: Shield, desc: "Low Risk, Steady returns, minimal growth potential, focuses on capital preservation.", equity: 25 },
  { key: "Moderate" as RiskProfile, icon: Activity, desc: "Balanced Risk, Moderate returns, mix of growth and income.", equity: 55 },
  { key: "Aggressive" as RiskProfile, icon: TrendingUp, desc: "High Risk, High potential returns, significant growth.", equity: 85 },
];

export default function RiskScreen() {
  const router = useRouter();
  const { riskProfile, setRiskProfile } = useApp();
  const t = useThemeColors();
  const [sel, setSel] = useState<RiskProfile>(riskProfile);
  return (
    <View style={{ flex: 1, backgroundColor: t.mode === "dark" ? "rgba(21,23,31,0.85)" : "rgba(30,34,48,0.28)", justifyContent: "flex-end" }}>
      <Pressable onPress={() => router.back()} style={{ flex: 1 }} />
      <ScrollView style={{ maxHeight: "90%", backgroundColor: t.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, borderTopWidth: 1, borderColor: t.border }} contentContainerStyle={{ padding: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={{ fontSize: 14, fontWeight: "700", color: t.foreground }}>Choose Your Risk Profile</Text>
              <HelpCircle size={12} color={t.mutedForeground} />
            </View>
            <Text style={{ fontSize: 10, color: t.mutedForeground, marginTop: 2 }}>Select the profile that aligns with your investment goals. Update anytime.</Text>
          </View>
          <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Close"><X size={16} color={t.mutedForeground} /></Pressable>
        </View>

        <View style={{ gap: 10 }}>
          {profiles.map((p) => {
            const active = sel === p.key;
            return (
              <Pressable
                key={p.key}
                onPress={() => setSel(p.key)}
                style={{
                  borderRadius: 16,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: active ? GOLD : t.border,
                  backgroundColor: active ? "rgba(193,168,107,0.1)" : t.card,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <View style={{ width: 32, height: 32, borderRadius: 12, backgroundColor: active ? "rgba(193,168,107,0.2)" : t.secondary, alignItems: "center", justifyContent: "center" }}>
                    <p.icon size={16} color={active ? GOLD : t.mutedForeground} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, fontWeight: "700", color: t.foreground }}>{p.key}</Text>
                    <Text style={{ fontSize: 9, color: t.mutedForeground, lineHeight: 13 }}>{p.desc}</Text>
                  </View>
                </View>
                <View style={{ marginTop: 8 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                    <Text style={{ fontSize: 8, color: t.mutedForeground }}>Equity {p.equity}%</Text>
                    <Text style={{ fontSize: 8, color: t.mutedForeground }}>Debt {100 - p.equity}%</Text>
                  </View>
                  <View style={{ height: 6, borderRadius: 3, backgroundColor: t.secondary, overflow: "hidden", flexDirection: "row" }}>
                    <View style={{ width: `${p.equity}%`, backgroundColor: GOLD }} />
                    <View style={{ width: `${100 - p.equity}%`, backgroundColor: "rgba(245,246,250,0.3)" }} />
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={() => { setRiskProfile(sel); router.back(); }}
          style={{ backgroundColor: GOLD, paddingVertical: 12, borderRadius: 12, alignItems: "center", marginTop: 16 }}
        >
          <Text style={{ fontSize: 13, fontWeight: "600", color: "#15171F" }}>Confirm</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
