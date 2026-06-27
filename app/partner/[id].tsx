import { ScrollView, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Star, TrendingUp, Award, Briefcase } from "lucide-react-native";
import { partners } from "@/data/data";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#C1A86B";
const SUCCESS = "#4ADE80";

export default function PartnerDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useThemeColors();
  const partner = partners.find((p) => p.id === String(id));
  if (!partner) {
    return (
      <View style={{ flex: 1, backgroundColor: t.background, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: t.foreground }}>Partner not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.background }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: Math.max(insets.bottom, 12) + 96, paddingTop: insets.top + 8 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingBottom: 8 }}>
        <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Go back">
          <ArrowLeft size={18} color={t.mutedForeground} />
        </Pressable>
        <Text style={{ color: t.foreground, fontSize: 13, fontWeight: "700" }}>Certified Partner</Text>
      </View>

      <View style={{ borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(193,168,107,0.2)" }}>
        <LinearGradient colors={["rgba(193,168,107,0.15)", "rgba(193,168,107,0.05)", "transparent"]} style={{ padding: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: GOLD, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#15171F" }}>
                {partner.name.split(" ").map((s) => s[0]).join("")}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: t.foreground, fontSize: 16, fontWeight: "700" }}>{partner.name}</Text>
              <Text style={{ color: t.mutedForeground, fontSize: 10 }}>{partner.firm}</Text>
              <View style={{ alignSelf: "flex-start", marginTop: 4, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, backgroundColor: "rgba(193,168,107,0.2)" }}>
                <Text style={{ fontSize: 8, color: GOLD, fontWeight: "600" }}>{partner.tag}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
              <Star size={14} color={GOLD} fill={GOLD} />
              <Text style={{ fontSize: 12, fontWeight: "700", color: t.foreground }}>{partner.rating}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: t.border }}>
            <Stat label="AUM" value={partner.aum} icon={Briefcase} />
            <Stat label="Experience" value={partner.exp} icon={Award} />
            <Stat label="Strategies" value={String(partner.strategies)} icon={TrendingUp} />
          </View>
        </LinearGradient>
      </View>

      <Text style={{ color: t.foreground, fontSize: 11, fontWeight: "600", marginTop: 20, marginBottom: 8 }}>
        Baskets by {partner.name.split(" ")[0]}
      </Text>
      <View style={{ gap: 10 }}>
        {partner.baskets.map((b) => (
          <Pressable
            key={b.id}
            onPress={() => router.push(`/basket/${b.id}`)}
            style={{ backgroundColor: t.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: t.border }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text style={{ color: t.foreground, fontSize: 14, fontWeight: "600" }}>{b.name}</Text>
                <Text style={{ color: t.mutedForeground, fontSize: 10, marginTop: 2 }}>{b.funds} funds · {b.category}</Text>
              </View>
              <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, backgroundColor: "rgba(193,168,107,0.2)", alignSelf: "flex-start" }}>
                <Text style={{ fontSize: 8, color: GOLD, fontWeight: "600" }}>{b.tag}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: t.border }}>
              <View>
                <Text style={{ fontSize: 9, color: t.mutedForeground }}>5Y Returns</Text>
                <Text style={{ fontSize: 14, fontWeight: "700", color: SUCCESS }}>{b.returns}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 9, color: t.mutedForeground }}>Min SIP</Text>
                <Text style={{ fontSize: 12, fontWeight: "600", color: t.foreground }}>{b.minSip}</Text>
              </View>
              <Text style={{ fontSize: 11, color: GOLD, fontWeight: "600" }}>View →</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function Stat({ label, value, icon: Icon }: any) {
  const t = useThemeColors();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Icon size={14} color={GOLD} />
      <Text style={{ fontSize: 9, color: t.mutedForeground, marginTop: 2 }}>{label}</Text>
      <Text style={{ fontSize: 11, fontWeight: "700", color: t.foreground }}>{value}</Text>
    </View>
  );
}
