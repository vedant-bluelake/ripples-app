import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Polyline, Polygon, Defs, LinearGradient as SvgGradient, Stop } from "react-native-svg";
import { ArrowLeft, Heart, ShoppingCart, TrendingUp } from "lucide-react-native";
import { useApp } from "@/context/AppContext";
import { funds } from "@/data/data";
import { AddToCartModal } from "@/components/AddToCartModal";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#C1A86B";
const SUCCESS = "#4ADE80";
const DESTRUCTIVE = "#F87171";

export default function FundDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useThemeColors();
  const { addToWishlist, inWishlist } = useApp();
  const [modal, setModal] = useState(false);
  const fund = funds.find((f) => f.id === String(id));

  if (!fund) {
    return <View style={{ flex: 1, backgroundColor: t.background, alignItems: "center", justifyContent: "center" }}><Text style={{ color: t.foreground }}>Fund not found</Text></View>;
  }

  const wishlistId = `${fund.id}-lumpsum`;

  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 12) + 110 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingTop: insets.top + 8, paddingBottom: 8 }}>
          <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Go back"><ArrowLeft size={18} color={t.mutedForeground} /></Pressable>
          <Text style={{ color: t.foreground, fontSize: 13, fontWeight: "700" }}>Fund Details</Text>
        </View>

        <View style={{ marginHorizontal: 16, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(193,168,107,0.2)" }}>
          <LinearGradient colors={["rgba(193,168,107,0.15)", "rgba(193,168,107,0.05)", "transparent"]} style={{ padding: 16 }}>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 9, fontWeight: "700", color: GOLD }}>{fund.amc.split(" ")[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: "700", color: t.foreground, lineHeight: 17 }}>{fund.name}</Text>
                <Text style={{ fontSize: 10, color: t.mutedForeground, marginTop: 2 }}>{fund.amc}</Text>
                <View style={{ flexDirection: "row", gap: 8, alignItems: "center", marginTop: 6 }}>
                  <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999, backgroundColor: t.card, borderWidth: 1, borderColor: t.border }}>
                    <Text style={{ fontSize: 8, color: t.foreground }}>{fund.rating === "Unrated" ? "Unrated" : `${fund.rating}.0 ★`}</Text>
                  </View>
                  <Text style={{ fontSize: 8, color: t.mutedForeground }}>{fund.cat}</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: t.border }}>
              <Cell label="NAV" value={`₹${fund.nav}`} />
              <Cell label="Asset" value={fund.asset} />
              <Cell label="Sub-Category" value={fund.subCat} />
            </View>
          </LinearGradient>
        </View>

        <View style={{ marginHorizontal: 16, marginTop: 12, backgroundColor: t.card, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: t.border }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <Text style={{ color: t.foreground, fontSize: 11, fontWeight: "600" }}>NAV ₹{fund.nav}</Text>
            <Text style={{ color: SUCCESS, fontSize: 11, fontWeight: "700" }}>
              {fund.returns.find((r) => r.label === "5Y")?.value || "—"}
            </Text>
          </View>
          <Svg height={90} width="100%" viewBox="0 0 320 90" preserveAspectRatio="none">
            <Defs>
              <SvgGradient id="ff" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={SUCCESS} stopOpacity="0.35" />
                <Stop offset="1" stopColor={SUCCESS} stopOpacity="0" />
              </SvgGradient>
            </Defs>
            <Polygon points="0,78 30,68 60,70 90,54 120,58 150,42 180,46 210,30 240,34 270,18 300,22 320,10 320,90 0,90" fill="url(#ff)" />
            <Polyline points="0,78 30,68 60,70 90,54 120,58 150,42 180,46 210,30 240,34 270,18 300,22 320,10" fill="none" stroke={SUCCESS} strokeWidth="2" />
          </Svg>
        </View>

        <Section title="Risk Metrics" accent={GOLD}>
          <View style={{ backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 12, padding: 12, flexDirection: "row", flexWrap: "wrap" }}>
            {Object.entries(fund.risk).map(([k, v]) => (
              <View key={k} style={{ width: "33.33%", alignItems: "center", paddingVertical: 4 }}>
                <Text style={{ fontSize: 9, color: t.mutedForeground, textTransform: "capitalize" }}>{k}</Text>
                <Text style={{ fontSize: 11, fontWeight: "700", color: t.foreground }}>{v}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Returns" accent={SUCCESS}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {fund.returns.map((r) => {
              const num = parseFloat(r.value.replace("%", ""));
              const color = isNaN(num) ? t.mutedForeground : num < 0 ? DESTRUCTIVE : SUCCESS;
              return (
                <View key={r.label} style={{ width: "23.5%", backgroundColor: t.card, borderWidth: 1, borderColor: "rgba(74,222,128,0.3)", borderRadius: 8, padding: 6, alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                    <TrendingUp size={9} color={color} />
                    <Text style={{ fontSize: 8, color: t.mutedForeground }}>{r.label}</Text>
                  </View>
                  <Text style={{ fontSize: 10, fontWeight: "700", color, marginTop: 2 }}>{r.value}</Text>
                </View>
              );
            })}
          </View>
        </Section>
      </ScrollView>

      <View style={{ position: "absolute", left: 0, right: 0, bottom: 0, backgroundColor: t.overlay, borderTopWidth: 1, borderTopColor: t.border, paddingHorizontal: 12, paddingVertical: 10, paddingBottom: Math.max(insets.bottom, 12), flexDirection: "row", gap: 8 }}>
        <Pressable
          onPress={() => addToWishlist({ id: wishlistId, kind: "fund-lumpsum", name: fund.name, meta: fund.cat, amount: `NAV ₹${fund.nav}` })}
          style={{ width: 44, height: 44, borderRadius: 12, borderWidth: 1, borderColor: inWishlist(wishlistId) ? GOLD : t.border, backgroundColor: inWishlist(wishlistId) ? "rgba(136,121,79,0.15)" : t.card, alignItems: "center", justifyContent: "center" }}
        >
          <Heart size={16} color={inWishlist(wishlistId) ? GOLD : t.mutedForeground} fill={inWishlist(wishlistId) ? GOLD : "transparent"} />
        </Pressable>
        <Pressable onPress={() => setModal(true)} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: GOLD, paddingVertical: 12, borderRadius: 12 }}>
          <ShoppingCart size={14} color="#15171F" />
          <Text style={{ fontSize: 12, fontWeight: "700", color: "#15171F" }}>Add to Cart</Text>
        </Pressable>
      </View>

      <AddToCartModal open={modal} onClose={() => setModal(false)} fund={{ id: fund.id, name: fund.name, meta: fund.cat }} />
    </View>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  const t = useThemeColors();
  return (
    <View>
      <Text style={{ fontSize: 9, color: t.mutedForeground }}>{label}</Text>
      <Text style={{ fontSize: 13, fontWeight: "700", color: t.foreground }}>{value}</Text>
    </View>
  );
}

function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  const t = useThemeColors();
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <View style={{ width: 2, height: 12, backgroundColor: accent, borderRadius: 1 }} />
        <Text style={{ fontSize: 11, fontWeight: "600", color: t.foreground }}>{title}</Text>
      </View>
      {children}
    </View>
  );
}
