import { ScrollView, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Layers, Users, UserPlus, Star, Gauge, TrendingUp, ShieldCheck, FileText, ChevronRight,
} from "lucide-react-native";
import { CPTopBar } from "@/components/cp/CPTopBar";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#88794F";

const stats = [
  { label: "Baskets Created", value: "12", Icon: Layers, delta: "+2 this mo" },
  { label: "External Clients", value: "48", Icon: TrendingUp, delta: "Marketplace" },
  { label: "Personal Clients", value: "26", Icon: UserPlus, delta: "Your ARN" },
  { label: "Your Rating", value: "4.9", Icon: Star, delta: "from 64 reviews" },
  { label: "Avg Basket Rating", value: "4.7", Icon: Gauge, delta: "across baskets" },
  { label: "Tier", value: "Silver", Icon: ShieldCheck, delta: "240 pts" },
];

const disclosures = [
  "Certified Partners are the backbone of the Ripples Marketplace. All CPs must follow fair and ethical practices at all times.",
  "Strict adherence to AMFI Code of Conduct, SEBI regulations, and Ripples™ Terms & Conditions is mandatory.",
  "Any breach may result in permanent suspension and reporting to relevant regulators.",
];

export default function CPDashboardScreen() {
  const insets = useSafeAreaInsets();
  const t = useThemeColors();
  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      <CPTopBar greetingName="Padma" subtitle="Your performance summary at a glance" />
      <ScrollView contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 12) + 32 }}>
        {/* Hero earnings */}
        <View className="mx-4 mt-4 rounded-2xl overflow-hidden border border-gold/30">
          <LinearGradient
            colors={["rgba(136,121,79,0.22)", "rgba(136,121,79,0.06)", "transparent"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={{ padding: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <View>
              <Text className="text-[10px] text-muted-foreground">Lifetime Earnings</Text>
              <Text className="text-xl font-bold text-foreground">₹ 4,82,150</Text>
              <Text className="text-[10px] text-success mt-0.5">+₹ 18,420 this month</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text className="text-[10px] text-muted-foreground">AUM</Text>
              <Text className="text-base font-bold text-foreground">₹ 12.4 Cr</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Stats grid */}
        <View className="px-4 mt-4 flex-row flex-wrap" style={{ gap: 10 }}>
          {stats.map((s) => (
            <View key={s.label} className="bg-secondary rounded-xl p-3 border border-border/60" style={{ width: "47.5%" }}>
              <View className="flex-row items-center justify-between">
                <Text className="text-[9px] text-muted-foreground" style={{ flex: 1 }}>{s.label}</Text>
                <s.Icon size={14} color={GOLD} />
              </View>
              <Text className="text-base font-bold text-foreground mt-1.5">{s.value}</Text>
              <Text className="text-[9px] text-muted-foreground mt-0.5">{s.delta}</Text>
            </View>
          ))}
        </View>

        {/* Compliance */}
        <View className="px-4 mt-5">
          <View className="flex-row items-center mb-2" style={{ gap: 6 }}>
            <FileText size={14} color={GOLD} />
            <Text className="text-[11px] font-semibold text-foreground">Compliance & Governance</Text>
          </View>
          <View className="bg-secondary border border-border/60 rounded-2xl p-3.5" style={{ gap: 10 }}>
            {disclosures.map((d, i) => (
              <View key={i} className="flex-row" style={{ gap: 8 }}>
                <Text className="text-[9px] font-bold text-gold" style={{ paddingTop: 2 }}>({["i","ii","iii"][i]})</Text>
                <Text className="text-[10px] text-muted-foreground" style={{ flex: 1, lineHeight: 14 }}>{d}</Text>
              </View>
            ))}
            <Pressable className="flex-row items-center justify-between border-t border-border/40 pt-2 mt-1">
              <Text className="text-[10px] text-gold font-semibold">Read full disclosures</Text>
              <ChevronRight size={12} color={GOLD} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
