import { ScrollView, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Star, TrendingUp, Heart, ShoppingCart, Box, Building2, BarChart3, Info } from "lucide-react-native";
import Svg, { Polyline, Polygon, Defs, LinearGradient as SvgGradient, Stop } from "react-native-svg";
import { baskets, marketplaceBaskets, type BasketItem } from "@/data/data";
import { Tag } from "@/components/Tag";
import { useApp } from "@/context/AppContext";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#C1A86B";
const SUCCESS = "#4ADE80";

function findBasket(id: string): { basket: BasketItem; partner?: any } | null {
  const direct = baskets.find((b) => b.id === id);
  if (direct) return { basket: direct };
  const m = marketplaceBaskets.find((b) => b.id === id);
  if (m) return { basket: m, partner: m.partner };
  return null;
}

export default function BasketDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useThemeColors();
  const { addToCart, addToWishlist, inCart, inWishlist } = useApp();
  const found = findBasket(String(id));
  if (!found) {
    return (
      <View style={{ flex: 1, backgroundColor: t.background, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: t.foreground }}>Basket not found</Text>
      </View>
    );
  }
  const { basket, partner } = found;

  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 12) + 96 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingTop: insets.top + 8, paddingBottom: 8 }}>
          <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Go back">
            <ArrowLeft size={18} color={t.mutedForeground} />
          </Pressable>
          <View>
            <Text style={{ color: t.foreground, fontSize: 13, fontWeight: "700" }}>Curated Basket</Text>
            {partner && <Text style={{ color: t.mutedForeground, fontSize: 10 }}>Cert. Partner: {partner.name}</Text>}
          </View>
        </View>

        <View style={{ marginHorizontal: 16, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(193,168,107,0.2)" }}>
          <LinearGradient colors={["rgba(193,168,107,0.15)", "rgba(193,168,107,0.05)", "transparent"]} style={{ padding: 16 }}>
            <View style={{ flexDirection: "row", gap: 12 }}>
              {partner && (
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: GOLD, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 11, fontWeight: "700", color: "#15171F" }}>
                    {partner.name.split(" ").map((s: string) => s[0]).join("").slice(0, 2)}
                  </Text>
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ color: t.foreground, fontSize: 16, fontWeight: "700" }}>{basket.name}</Text>
                {partner && (
                  <Text style={{ color: t.mutedForeground, fontSize: 9, marginTop: 2 }}>
                    AUM: {partner.aum} · Exp: {partner.exp}
                  </Text>
                )}
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                  <Tag label={basket.risk.toUpperCase()} variant="gold" />
                  <Tag label={basket.riskTag.toUpperCase()} variant="success" />
                  <Tag label={`${basket.horizon} | HORIZON`} variant="outline" />
                </View>
                <View style={{ flexDirection: "row", gap: 1, marginTop: 8 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} color={i < basket.rating ? GOLD : t.border} fill={i < basket.rating ? GOLD : "transparent"} />
                  ))}
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Mini NAV chart */}
        <View style={{ marginHorizontal: 16, marginTop: 12, backgroundColor: t.card, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: t.border }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <Text style={{ color: t.foreground, fontSize: 11, fontWeight: "600" }}>NAV</Text>
            <Text style={{ color: SUCCESS, fontSize: 11, fontWeight: "700" }}>{basket.returns}</Text>
          </View>
          <Svg height={80} width="100%" viewBox="0 0 320 80" preserveAspectRatio="none">
            <Defs>
              <SvgGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={SUCCESS} stopOpacity="0.35" />
                <Stop offset="1" stopColor={SUCCESS} stopOpacity="0" />
              </SvgGradient>
            </Defs>
            <Polygon points="0,70 30,60 60,62 90,48 120,52 150,38 180,42 210,28 240,32 270,18 300,22 320,10 320,80 0,80" fill="url(#fill)" />
            <Polyline points="0,70 30,60 60,62 90,48 120,52 150,38 180,42 210,28 240,32 270,18 300,22 320,10" fill="none" stroke={SUCCESS} strokeWidth="2" />
          </Svg>
        </View>

        <View style={{ flexDirection: "row", gap: 8, paddingHorizontal: 16, marginTop: 12 }}>
          <SmallStat icon={Box} title="Fund Holdings" value={String(basket.funds)} sub="Active Funds" />
          <SmallStat icon={Building2} title="AMCs" value={String(basket.amcs)} sub="Fund Houses" />
          <SmallStat icon={BarChart3} title="Category" value={basket.category} sub="Asset Class" highlight />
        </View>

        <Section title="Basket Highlights" accent>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {basket.highlights.map((h) => (
              <View key={h.label} style={{ width: "25%", alignItems: "center", paddingVertical: 6 }}>
                <Text style={{ color: t.mutedForeground, fontSize: 9 }}>{h.label}</Text>
                <Text style={{ color: t.foreground, fontSize: 11, fontWeight: "700" }}>{h.value}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Historical Returns" accent>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {basket.history.map((h) => (
              <View
                key={h.label}
                style={{
                  width: "23.5%",
                  backgroundColor: t.card,
                  borderWidth: 1,
                  borderColor: "rgba(74,222,128,0.3)",
                  borderRadius: 8,
                  padding: 6,
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                  <TrendingUp size={9} color={SUCCESS} />
                    <Text style={{ fontSize: 8, color: t.mutedForeground }}>{h.label}</Text>
                </View>
                <Text style={{ fontSize: 10, fontWeight: "700", color: SUCCESS, marginTop: 2 }}>{h.value}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="About this Basket">
          <View style={{ flexDirection: "row", gap: 8, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 12, padding: 12 }}>
            <Info size={14} color={GOLD} />
            <Text style={{ flex: 1, fontSize: 10, lineHeight: 16, color: t.mutedForeground }}>
              Allocates 75% to low-risk and 25% to high-risk assets. Balances safety with limited growth potential. Suitable for {basket.horizon.toLowerCase()} investment horizon.
            </Text>
          </View>
        </Section>
      </ScrollView>

      {/* Sticky action bar */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: t.overlay,
          borderTopWidth: 1,
          borderTopColor: t.border,
          paddingHorizontal: 12,
          paddingVertical: 10,
          paddingBottom: Math.max(insets.bottom, 12),
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Pressable
          onPress={() => addToWishlist({ id: basket.id, kind: "basket", name: basket.name, meta: `${basket.funds} funds · ${basket.category}`, amount: `Min SIP ${basket.minSip}` })}
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: inWishlist(basket.id) ? GOLD : t.border,
            backgroundColor: inWishlist(basket.id) ? "rgba(136,121,79,0.15)" : t.card,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Heart size={16} color={inWishlist(basket.id) ? GOLD : t.mutedForeground} fill={inWishlist(basket.id) ? GOLD : "transparent"} />
        </Pressable>
        <Pressable
          onPress={() => addToCart({ id: basket.id, kind: "basket", name: basket.name, meta: `${basket.funds} funds · ${basket.category}`, amount: `Min ${basket.minSip}` })}
          style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: GOLD, paddingVertical: 12, borderRadius: 12 }}
        >
          <ShoppingCart size={14} color="#15171F" />
          <Text style={{ fontSize: 12, fontWeight: "700", color: "#15171F" }}>
            {inCart(basket.id) ? "Added to Cart" : "Add to Cart"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function SmallStat({ icon: Icon, title, value, sub, highlight }: any) {
  const t = useThemeColors();
  return (
    <View style={{ flex: 1, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 12, padding: 10 }}>
      <Text style={{ fontSize: 9, color: t.mutedForeground }}>{title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
        <Text style={{ fontSize: 13, fontWeight: "700", color: highlight ? GOLD : t.foreground }} numberOfLines={1}>{value}</Text>
        <Icon size={14} color={t.mutedForeground} />
      </View>
      <Text style={{ fontSize: 8, color: t.mutedForeground, marginTop: 2 }}>{sub}</Text>
    </View>
  );
}

function Section({ title, children, accent }: { title: string; children: React.ReactNode; accent?: boolean }) {
  const t = useThemeColors();
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 }}>
        {accent && <View style={{ width: 2, height: 12, backgroundColor: SUCCESS, borderRadius: 1 }} />}
        <Text style={{ fontSize: 11, fontWeight: "600", color: t.foreground }}>{title}</Text>
      </View>
      {children}
    </View>
  );
}
