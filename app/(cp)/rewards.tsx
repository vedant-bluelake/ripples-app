import { ScrollView, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Trophy, Layers, Users, TrendingUp, Star, StarHalf, Award, Info } from "lucide-react-native";
import { CPTopBar } from "@/components/cp/CPTopBar";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#88794F";
const SUCCESS = "#34C26B";

const metrics = [
  { label: "Investment Baskets", value: "12", pts: "+12 pts", Icon: Layers },
  { label: "Personal Clients", value: "26", pts: "+130 pts", Icon: Users },
  { label: "Total Purchase Value", value: "₹3.4 Cr", pts: "+24 pts", Icon: TrendingUp },
  { label: "5-Star Reviews", value: "48", pts: "+240 pts", Icon: Star },
  { label: "4-Star Reviews", value: "16", pts: "+32 pts", Icon: StarHalf },
];
const points = [
  ["Every Basket Created", "1 point"],
  ["Onboard Your Personal Clients", "5 points"],
  ["Every ₹1 Crore Purchase Value", "7 points"],
  ["Every 5-star Client Rating", "5 points"],
  ["Every 4-star Client Rating", "2 points"],
];
const tiers = [
  { name: "Bronze", at: 100 },
  { name: "Silver", at: 250 },
  { name: "Gold", at: 500 },
];

export default function CPRewardsScreen() {
  const insets = useSafeAreaInsets();
  const t = useThemeColors();
  const total = 438;
  const next = tiers.find((t) => t.at > total) || tiers[tiers.length - 1];
  const prev = tiers.filter((t) => t.at <= total).pop();
  const pct = Math.min(100, Math.round(((total - (prev?.at || 0)) / (next.at - (prev?.at || 0))) * 100));

  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      <CPTopBar title="My Rewards" subtitle="Earn points · Climb tiers · Unlock benefits" />
      <ScrollView contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 12) + 32 }}>
        <View className="px-4 pt-4">
          {/* Tier card */}
          <View className="rounded-2xl overflow-hidden border border-gold/30">
            <LinearGradient
              colors={["rgba(136,121,79,0.25)", "rgba(136,121,79,0.10)", "transparent"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={{ padding: 16 }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center" style={{ gap: 8 }}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(136,121,79,0.25)", alignItems: "center", justifyContent: "center" }}>
                    <Award size={20} color={GOLD} />
                  </View>
                  <View>
                    <Text className="text-[10px] text-muted-foreground">Current Tier</Text>
                    <Text className="text-base font-bold text-foreground">Silver</Text>
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text className="text-[10px] text-muted-foreground">Total Points</Text>
                  <Text style={{ fontSize: 18, fontWeight: "700", color: GOLD }}>{total}</Text>
                </View>
              </View>
              <View className="mt-3">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-[9px] text-muted-foreground">{prev?.name || "Start"}</Text>
                  <Text className="text-[9px] text-muted-foreground">{next.at - total} pts to {next.name}</Text>
                </View>
                <View style={{ height: 6, borderRadius: 3, backgroundColor: "rgba(0,0,0,0.35)", overflow: "hidden" }}>
                  <View style={{ width: `${pct}%`, height: "100%", backgroundColor: GOLD }} />
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Performance Metrics */}
          <View className="mt-5">
            <View className="flex-row items-center mb-2" style={{ gap: 6 }}>
              <Trophy size={14} color={GOLD} />
              <Text className="text-[11px] font-semibold text-foreground">Performance Metrics</Text>
            </View>
            <View className="flex-row flex-wrap" style={{ gap: 8 }}>
              {metrics.map((m) => (
                <View key={m.label} className="bg-secondary rounded-xl p-2.5 border border-border/60" style={{ width: "48%" }}>
                  <m.Icon size={14} color={GOLD} />
                  <Text className="text-sm font-bold text-foreground mt-1">{m.value}</Text>
                  <Text className="text-[9px] text-muted-foreground">{m.label}</Text>
                  <Text style={{ fontSize: 9, fontWeight: "700", color: SUCCESS, marginTop: 4 }}>{m.pts}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Point Structure */}
          <View className="mt-5">
            <Text className="text-[11px] font-semibold text-foreground mb-2">Point Structure</Text>
            <View className="bg-secondary border border-border/60 rounded-2xl overflow-hidden">
              {points.map((p, i) => (
                <View key={p[0]} className="flex-row items-center justify-between px-3.5 py-2.5" style={{ borderTopWidth: i === 0 ? 0 : 1, borderColor: "#3A3F50" }}>
                  <Text className="text-[11px] text-foreground">{p[0]}</Text>
                  <Text style={{ fontSize: 11, fontWeight: "700", color: GOLD }}>{p[1]}</Text>
                </View>
              ))}
            </View>
            <View className="mt-2 flex-row bg-gold/5 border border-gold/20 rounded-xl p-2.5" style={{ gap: 6 }}>
              <Info size={12} color={GOLD} />
              <Text className="text-[9px] text-muted-foreground" style={{ flex: 1, lineHeight: 13 }}>
                To receive credit, ensure clients enter your valid ARN code at checkout. A flat 50% of trail income applies on AUM of all clients onboarded with your ARN, regardless of current tier.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
