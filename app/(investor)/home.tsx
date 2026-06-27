import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, ScrollView, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Svg, { Polyline, Polygon, Defs, LinearGradient as SvgGradient, Stop } from "react-native-svg";
import {
  TrendingUp, TrendingDown, ArrowUpRight, Layers, Store, SlidersHorizontal,
  ShieldCheck, Star, Landmark, Sparkles, Play, Eye, EyeOff,
} from "lucide-react-native";
import { TopBar } from "@/components/TopBar";
import { useApp } from "@/context/AppContext";
import { useThemeColors } from "@/theme/ThemeContext";
import { baskets, marketplaceBaskets, funds, type BasketItem, type MarketBasket, type FundItem } from "@/data/data";
import { TutorialOverlay } from "@/components/TutorialOverlay";

const GOLD = "#C1A86B";
const SUCCESS = "#4ADE80";
const DESTRUCTIVE = "#F87171";

const holdings = [
  { name: "Ripples Growth Basket", value: "₹2,45,800", returns: "+18.4%" },
  { name: "HDFC Mid Cap Fund", value: "₹1,12,350", returns: "+12.7%" },
  { name: "Axis Bluechip Fund", value: "₹89,200", returns: "+8.2%" },
];

const quickActions = [
  { icon: Layers, label: "Baskets", route: "/(investor)/baskets" as const },
  { icon: Store, label: "Marketplace", route: "/(investor)/marketplace" as const },
  { icon: SlidersHorizontal, label: "D.I.Y.", route: "/(investor)/diy" as const },
  { icon: Landmark, label: "LAS", route: null },
];

export default function HomeTab() {
  const router = useRouter();
  const t = useThemeColors();
  const { riskProfile, tutorialSeen, markTutorialSeen } = useApp();
  const [amountVisible, setAmountVisible] = useState(true);
  const shimmer = useRef(new Animated.Value(-110)).current;
  const mask = "₹ • • • • • •";

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 360,
        duration: 2200,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);

  const basketsTop = useMemo(() => [...baskets].sort((a, b) => parseFloat(b.returns) - parseFloat(a.returns)).slice(0, 6), []);
  const basketsLow = useMemo(() => [...baskets].sort((a, b) => parseFloat(a.returns) - parseFloat(b.returns)).slice(0, 6), []);
  const marketTop = useMemo(() => [...marketplaceBaskets].sort((a, b) => parseFloat(b.returns) - parseFloat(a.returns)).slice(0, 6), []);
  const marketLow = useMemo(() => [...marketplaceBaskets].sort((a, b) => parseFloat(a.returns) - parseFloat(b.returns)).slice(0, 6), []);
  const fundsTop = useMemo(() => [...funds].sort((a, b) => parseFloat(b.returns.find((r) => r.label === "1Y")?.value || "0") - parseFloat(a.returns.find((r) => r.label === "1Y")?.value || "0")).slice(0, 6), []);
  const fundsLow = useMemo(() => [...funds].sort((a, b) => parseFloat(a.returns.find((r) => r.label === "1Y")?.value || "0") - parseFloat(b.returns.find((r) => r.label === "1Y")?.value || "0")).slice(0, 6), []);

  const madeForYou = useMemo(() => {
    const target = riskProfile === "Conservative" ? "Low" : riskProfile === "Aggressive" ? "High" : "Moderate";
    return [...baskets].sort((a, b) => {
      const am = a.risk === target ? 0 : 1;
      const bm = b.risk === target ? 0 : 1;
      if (am !== bm) return am - bm;
      return parseFloat(b.returns) - parseFloat(a.returns);
    }).slice(0, 5);
  }, [riskProfile]);

  const spotlight = basketsTop[0];

  return (
    <>
    <ScrollView style={{ flex: 1, backgroundColor: t.background }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 96 }}>
      <TopBar
        greetingName="Rahul Sharma"
        onOpenWishlist={() => router.push("/wishlist")}
        onOpenCart={() => router.push("/cart")}
        onOpenProfile={() => router.push("/profile")}
      />

      {/* Hero portfolio */}
      <View style={{ borderRadius: 24, overflow: "hidden", borderWidth: 1, borderColor: "rgba(193,168,107,0.25)", marginTop: 8, marginBottom: 12 }}>
        <LinearGradient colors={[t.card, t.navy, t.background]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Sparkles size={11} color={GOLD} />
              <Text style={{ color: GOLD, fontSize: 10, fontWeight: "500", letterSpacing: 1.8 }}>YOUR PORTFOLIO</Text>
            </View>
            <Pressable
              onPress={() => setAmountVisible((v) => !v)}
              style={{ width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: "rgba(193,168,107,0.3)", alignItems: "center", justifyContent: "center" }}
            >
              {amountVisible ? <Eye size={14} color={GOLD} /> : <EyeOff size={14} color={GOLD} />}
            </Pressable>
          </View>
          <Text style={{ fontSize: 34, lineHeight: 38, fontWeight: "700", color: t.foreground, marginTop: 6 }}>
            {amountVisible ? "₹4,47,350" : mask}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, backgroundColor: "rgba(74,222,128,0.15)", borderWidth: 1, borderColor: "rgba(74,222,128,0.3)" }}>
              <TrendingUp size={11} color={SUCCESS} />
              <Text style={{ color: SUCCESS, fontSize: 10, fontWeight: "600" }}>{amountVisible ? "+13.2%" : "+ • • %"}</Text>
            </View>
            <Text style={{ color: t.mutedForeground, fontSize: 10 }}>{amountVisible ? "+₹52,340 all-time" : "+₹ • • • • all-time"}</Text>
          </View>
          <View style={{ marginTop: 12, height: 48, overflow: "hidden" }}>
            <Svg height="100%" width="100%" viewBox="0 0 320 48" preserveAspectRatio="none">
              <Defs>
                <SvgGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={GOLD} stopOpacity="0.35" />
                  <Stop offset="1" stopColor={GOLD} stopOpacity="0" />
                </SvgGradient>
              </Defs>
              <Polygon points="0,40 30,34 60,36 90,28 120,30 150,22 180,24 210,16 240,18 270,10 300,12 320,6 320,48 0,48" fill="url(#heroFill)" />
              <Polyline points="0,40 30,34 60,36 90,28 120,30 150,22 180,24 210,16 240,18 270,10 300,12 320,6" fill="none" stroke={GOLD} strokeWidth={2} />
            </Svg>
            <Animated.View pointerEvents="none" style={{ position: "absolute", top: 0, bottom: 0, width: 88, transform: [{ translateX: shimmer }, { skewX: "-18deg" }] }}>
              <LinearGradient colors={["transparent", "rgba(193,168,107,0.26)", "transparent"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }} />
            </Animated.View>
          </View>
        </LinearGradient>
      </View>

      {/* Quick actions */}
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
        {quickActions.map((a) => (
          <Pressable
            key={a.label}
            onPress={() => a.route && router.push(a.route)}
            style={{ flex: 1, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 16, paddingVertical: 12, alignItems: "center", gap: 6 }}
          >
            <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(193,168,107,0.15)", alignItems: "center", justifyContent: "center" }}>
              <a.icon size={14} color={GOLD} />
            </View>
            <Text style={{ fontSize: 9, color: t.foreground, fontWeight: "500" }}>{a.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Risk profile CTA */}
      <Pressable
        onPress={() => router.push("/risk")}
        style={{ borderRadius: 16, borderWidth: 1, borderColor: "rgba(193,168,107,0.3)", marginBottom: 24, overflow: "hidden" }}
      >
        <LinearGradient colors={["rgba(193,168,107,0.15)", "rgba(193,168,107,0.05)", "transparent"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ padding: 12, flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(193,168,107,0.2)", alignItems: "center", justifyContent: "center" }}>
            <ShieldCheck size={16} color={GOLD} />
          </View>
          <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, fontWeight: "600", color: t.foreground }}>Risk Profile · {riskProfile}</Text>
              <Text style={{ fontSize: 9, color: t.mutedForeground }}>Tap to update your investment appetite</Text>
          </View>
          <ArrowUpRight size={14} color={GOLD} />
        </LinearGradient>
      </Pressable>

      {/* Spotlight */}
      {spotlight && (
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: GOLD }} />
            <Text style={{ fontSize: 10, fontWeight: "600", color: GOLD, letterSpacing: 1.8 }}>TODAY'S SPOTLIGHT</Text>
          </View>
          <Pressable onPress={() => router.push(`/basket/${spotlight.id}`)} style={{ borderRadius: 24, overflow: "hidden", borderWidth: 1, borderColor: "rgba(193,168,107,0.3)" }}>
          <LinearGradient colors={["rgba(136,121,79,0.35)", t.card, t.navy]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ padding: 20, minHeight: 160, justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 9, letterSpacing: 2, color: t.mutedForeground, fontWeight: "500" }}>CURATED BASKET</Text>
                  <Text style={{ fontSize: 22, lineHeight: 26, fontWeight: "700", color: t.foreground, marginTop: 4, maxWidth: 200 }}>{spotlight.name}</Text>
                </View>
                <View style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: "rgba(193,168,107,0.4)", alignItems: "center", justifyContent: "center" }}>
                  <Image source={require("../../assets/basket-icon.png")} style={{ width: 24, height: 24 }} contentFit="contain" />
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginTop: 16 }}>
                <View>
                  <Text style={{ fontSize: 9, color: t.mutedForeground }}>5Y Returns</Text>
                  <Text style={{ fontSize: 24, fontWeight: "700", color: GOLD, marginTop: 2 }}>{spotlight.returns}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: GOLD }}>
                  <Play size={11} color="#15171F" fill="#15171F" />
                  <Text style={{ fontSize: 10, fontWeight: "700", color: "#15171F" }}>Invest</Text>
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        </View>
      )}

      <HRail title={`Made for ${riskProfile}`} tag="For You" trend="up" onSeeAll={() => router.push("/(investor)/baskets")}>
        {madeForYou.map((b, i) => (
          <CoverCard key={"mfy" + b.id} b={b} accent={i % 2 === 0} onPress={() => router.push(`/basket/${b.id}`)} />
        ))}
      </HRail>

      {/* Holdings */}
      <View style={{ marginTop: 28 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Text style={{ fontSize: 12, fontWeight: "700", color: t.foreground }}>Your Holdings</Text>
          <Text style={{ fontSize: 10, color: GOLD, fontWeight: "500" }}>View All</Text>
        </View>
        <View style={{ gap: 10 }}>
          {holdings.map((h) => (
            <View key={h.name} style={{ backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 16, padding: 12, flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: t.foreground, fontSize: 12, fontWeight: "600" }}>{h.name}</Text>
                <Text style={{ color: t.mutedForeground, fontSize: 10, marginTop: 2 }}>{amountVisible ? h.value : "₹ • • • • • •"}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Text style={{ color: SUCCESS, fontSize: 12, fontWeight: "600" }}>{h.returns}</Text>
                <ArrowUpRight size={12} color={SUCCESS} />
              </View>
            </View>
          ))}
        </View>
      </View>

      <HRail title="Baskets" tag="Top Performers" trend="up" onSeeAll={() => router.push("/(investor)/baskets")}>
        {basketsTop.map((b) => <BasketDataCard key={"bt" + b.id} b={b} positive onPress={() => router.push(`/basket/${b.id}`)} />)}
      </HRail>
      <HRail title="Baskets" tag="Top Losers" trend="down" onSeeAll={() => router.push("/(investor)/baskets")}>
        {basketsLow.map((b) => <BasketDataCard key={"bl" + b.id} b={b} onPress={() => router.push(`/basket/${b.id}`)} />)}
      </HRail>

      <HRail title="Marketplace" tag="Top Performers" trend="up" onSeeAll={() => router.push("/(investor)/marketplace")}>
        {marketTop.map((b) => <PartnerRailCard key={"mt" + b.id} b={b} positive={parseFloat(b.returns) >= 0} onPress={() => router.push(`/basket/${b.id}`)} />)}
      </HRail>
      <HRail title="Marketplace" tag="Top Losers" trend="down" onSeeAll={() => router.push("/(investor)/marketplace")}>
        {marketLow.map((b) => <PartnerRailCard key={"ml" + b.id} b={b} positive={parseFloat(b.returns) >= 0} onPress={() => router.push(`/basket/${b.id}`)} />)}
      </HRail>

      <HRail title="D.I.Y." tag="Top Performers" trend="up" onSeeAll={() => router.push("/(investor)/diy")}>
        {fundsTop.map((f) => <FundRailCard key={"ft" + f.id} f={f} positive onPress={() => router.push(`/fund/${f.id}`)} />)}
      </HRail>
      <HRail title="D.I.Y." tag="Top Losers" trend="down" onSeeAll={() => router.push("/(investor)/diy")}>
        {fundsLow.map((f) => <FundRailCard key={"fl" + f.id} f={f} onPress={() => router.push(`/fund/${f.id}`)} />)}
      </HRail>

      <View style={{ marginTop: 32, alignItems: "center" }}>
        <Text style={{ fontSize: 10, color: t.mutedForeground }}>You're all caught up ✨</Text>
      </View>
    </ScrollView>
    {!tutorialSeen && <TutorialOverlay onClose={markTutorialSeen} />}
    </>
  );
}

function HRail({ title, tag, trend, onSeeAll, children }: { title: string; tag: string; trend: "up" | "down"; onSeeAll: () => void; children: React.ReactNode }) {
  const t = useThemeColors();
  const color = trend === "up" ? SUCCESS : DESTRUCTIVE;
  const bg = trend === "up" ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)";
  return (
    <View style={{ marginTop: 28 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, flex: 1 }}>
          <Text style={{ fontSize: 13, fontWeight: "700", color: t.foreground }} numberOfLines={1}>{title}</Text>
          <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999, backgroundColor: bg, borderWidth: 1, borderColor: color }}>
            <Text style={{ fontSize: 8.5, fontWeight: "700", color, letterSpacing: 1 }}>{tag.toUpperCase()}</Text>
          </View>
        </View>
        <Pressable onPress={onSeeAll}><Text style={{ fontSize: 10, color: GOLD, fontWeight: "500" }}>See All →</Text></Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingRight: 16 }}>
        {children}
      </ScrollView>
    </View>
  );
}

function CoverCard({ b, accent, onPress }: { b: BasketItem; accent?: boolean; onPress: () => void }) {
  const t = useThemeColors();
  const positive = parseFloat(b.returns) >= 12;
  const colors: [string, string, string] = accent
    ? ["rgba(193,168,107,0.4)", "rgba(193,168,107,0.15)", t.card]
    : [t.card, t.navy, t.background];
  return (
    <Pressable onPress={onPress} style={{ width: 148 }}>
      <View style={{ width: 148, height: 148, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(58,63,80,0.6)" }}>
        <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1, padding: 8, justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 2, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999, backgroundColor: "rgba(21,23,31,0.6)" }}>
              <Star size={9} color={GOLD} fill={GOLD} />
              <Text style={{ fontSize: 8.5, fontWeight: "600", color: t.foreground }}>{b.rating}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 2, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999, backgroundColor: "rgba(21,23,31,0.7)", borderWidth: 1, borderColor: "rgba(193,168,107,0.3)" }}>
              {positive ? <TrendingUp size={9} color={SUCCESS} /> : <TrendingDown size={9} color={DESTRUCTIVE} />}
              <Text style={{ fontSize: 9, fontWeight: "700", color: positive ? SUCCESS : DESTRUCTIVE }}>{b.returns}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 14, fontWeight: "700", color: t.foreground, lineHeight: 17 }} numberOfLines={3}>{b.name}</Text>
        </LinearGradient>
      </View>
      <Text style={{ fontSize: 9, color: t.mutedForeground, marginTop: 6 }} numberOfLines={1}>{b.funds} funds · {b.amcs} AMCs · {b.horizon}</Text>
    </Pressable>
  );
}

function DataCard({ iconType, title, sub, primary, positive, onPress }: { iconType: "basket" | "market" | "fund"; title: string; sub: string; primary: string; positive: boolean; onPress: () => void }) {
  const t = useThemeColors();
  const Icon = iconType === "basket" ? Layers : iconType === "market" ? Store : SlidersHorizontal;
  return (
    <Pressable onPress={onPress} style={{ width: 200, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 18, padding: 12, minHeight: 104 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
        <View style={{ width: 26, height: 26, borderRadius: 9, backgroundColor: "rgba(136,121,79,0.16)", alignItems: "center", justifyContent: "center" }}>
          <Icon size={13} color={GOLD} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, fontWeight: "700", color: t.foreground, lineHeight: 15 }} numberOfLines={2}>{title}</Text>
          <Text style={{ fontSize: 9, color: t.mutedForeground, marginTop: 4 }} numberOfLines={1}>{sub}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: t.border }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          {positive ? <TrendingUp size={11} color={SUCCESS} /> : <TrendingDown size={11} color={DESTRUCTIVE} />}
          <Text style={{ fontSize: 13, fontWeight: "700", color: positive ? SUCCESS : DESTRUCTIVE }}>{primary}</Text>
        </View>
        <Text style={{ fontSize: 9, color: GOLD, fontWeight: "600" }}>View →</Text>
      </View>
    </Pressable>
  );
}

function DataCardShell({ glyph, category, name, stats, footerLeft, primary, positive, onPress }: { glyph: React.ReactNode; category: string; name: string; stats: { label: string; value: string }[]; footerLeft: React.ReactNode; primary: string; positive: boolean; onPress: () => void }) {
  const t = useThemeColors();
  return (
    <Pressable onPress={onPress} style={{ width: 220, minHeight: 178, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 18, padding: 12, overflow: "hidden" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View style={{ width: 28, height: 28, borderRadius: 9, backgroundColor: "rgba(136,121,79,0.16)", borderWidth: 1, borderColor: "rgba(136,121,79,0.24)", alignItems: "center", justifyContent: "center" }}>{glyph}</View>
        <Text style={{ flex: 1, fontSize: 8.5, color: t.gold, fontWeight: "700", letterSpacing: 0.8, textTransform: "uppercase" }} numberOfLines={1}>{category}</Text>
      </View>
      <Text style={{ fontSize: 13, fontWeight: "700", color: t.foreground, lineHeight: 17, marginTop: 10 }} numberOfLines={2}>{name}</Text>
      <View style={{ flexDirection: "row", gap: 4, marginTop: 14, backgroundColor: t.background, borderWidth: 1, borderColor: t.border, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 5 }}>
        {stats.map((s) => (
          <View key={s.label} style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 8.5, color: t.mutedForeground }}>{s.label}</Text>
            <Text style={{ fontSize: 11, fontWeight: "700", color: parseFloat(s.value) < 0 ? DESTRUCTIVE : t.foreground, marginTop: 2 }}>{s.value}</Text>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 12 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 3 }}>{footerLeft}</View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 999, backgroundColor: positive ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)", borderWidth: 1, borderColor: positive ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)" }}>
          {positive ? <TrendingUp size={10} color={SUCCESS} /> : <TrendingDown size={10} color={DESTRUCTIVE} />}
          <Text style={{ fontSize: 9.5, fontWeight: "700", color: positive ? SUCCESS : DESTRUCTIVE }}>{primary}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function BasketDataCard({ b, positive, onPress }: { b: BasketItem; positive?: boolean; onPress: () => void }) {
  const t = useThemeColors();
  const get = (label: string) => b.history.find((h) => h.label === label)?.value || "—";
  return <DataCardShell glyph={<Image source={require("../../assets/basket-icon.png")} style={{ width: 18, height: 18 }} contentFit="contain" />} category={b.category} name={b.name} stats={[{ label: "1Y", value: get("1Y") }, { label: "3Y", value: get("3Y") }, { label: "5Y", value: get("5Y") }]} footerLeft={<><Star size={10} color={GOLD} fill={GOLD} /><Text style={{ fontSize: 9, color: t.foreground, fontWeight: "700" }}>{b.rating}</Text><Text style={{ fontSize: 9, color: t.mutedForeground }} numberOfLines={1}> · {b.funds} funds</Text></>} primary={b.returns} positive={positive ?? parseFloat(b.returns) >= 0} onPress={onPress} />;
}

function PartnerRailCard({ b, positive, onPress }: { b: MarketBasket; positive?: boolean; onPress: () => void }) {
  const t = useThemeColors();
  const get = (label: string) => b.history.find((h) => h.label === label)?.value || "—";
  const initials = b.partner.name.split(" ").map((s) => s[0]).join("").slice(0, 2);
  return <DataCardShell glyph={<Text style={{ fontSize: 9, color: t.gold, fontWeight: "800" }}>{initials}</Text>} category={b.partner.name} name={b.name} stats={[{ label: "1Y", value: get("1Y") }, { label: "3Y", value: get("3Y") }, { label: "5Y", value: get("5Y") }]} footerLeft={<Text style={{ fontSize: 9, color: t.mutedForeground }} numberOfLines={1}>{b.category} · {b.horizon}</Text>} primary={b.returns} positive={positive ?? parseFloat(b.returns) >= 0} onPress={onPress} />;
}

function FundRailCard({ f, positive, onPress }: { f: FundItem; positive?: boolean; onPress: () => void }) {
  const t = useThemeColors();
  const get = (label: string) => f.returns.find((r) => r.label === label)?.value || "—";
  const oneY = get("1Y");
  const initials = f.amc.replace(/Mutual Fund/i, "").trim().split(" ").map((s) => s[0]).join("").slice(0, 3);
  return <DataCardShell glyph={<Text style={{ fontSize: 9, color: t.gold, fontWeight: "800" }}>{initials}</Text>} category={f.subCat} name={f.name} stats={[{ label: "1Y", value: oneY }, { label: "3Y", value: get("3Y") }, { label: "5Y", value: get("5Y") }]} footerLeft={<Text style={{ fontSize: 9, color: t.mutedForeground }} numberOfLines={1}>{f.asset} · NAV ₹{f.nav}</Text>} primary={oneY} positive={positive ?? parseFloat(oneY) >= 0} onPress={onPress} />;
}
