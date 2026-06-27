import { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, ScrollView, Animated, Dimensions, Easing } from "react-native";
import { useRouter } from "expo-router";
import { Search, Filter, Heart, ShoppingCart, Activity, LineChart, X, ChevronDown } from "lucide-react-native";
import { TopBar } from "@/components/TopBar";
import { AddToCartModal } from "@/components/AddToCartModal";
import { useApp } from "@/context/AppContext";
import { funds, type FundItem } from "@/data/data";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#C1A86B";
const SUCCESS = "#4ADE80";
const DESTRUCTIVE = "#F87171";

export default function DIYTab() {
  const router = useRouter();
  const [openFilter, setOpenFilter] = useState(false);
  const [modalFund, setModalFund] = useState<FundItem | null>(null);
  const { addToWishlist, inWishlist } = useApp();
  const t = useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 96 }}>
        <TopBar
          title="D.I.Y."
          subtitle="Curate your own portfolio"
          onOpenWishlist={() => router.push("/wishlist")}
          onOpenCart={() => router.push("/cart")}
          onOpenProfile={() => router.push("/profile")}
        />

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: t.card, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 }}>
            <Search size={14} color={t.mutedForeground} />
            <Text style={{ fontSize: 11, color: t.mutedForeground }}>Search scheme name</Text>
          </View>
          <Pressable
            onPress={() => setOpenFilter(true)}
            style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(193,168,107,0.15)", borderWidth: 1, borderColor: "rgba(193,168,107,0.3)", alignItems: "center", justifyContent: "center" }}
          >
            <Filter size={16} color={GOLD} />
          </Pressable>
        </View>

        <View style={{ gap: 10 }}>
          {funds.map((f) => (
            <Pressable
              key={f.id}
              onPress={() => router.push(`/fund/${f.id}`)}
              style={{ backgroundColor: t.card, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: t.border }}
            >
              <FundTile
                f={f}
                onAdd={() => setModalFund(f)}
                onWish={() => addToWishlist({ id: `${f.id}-lumpsum`, kind: "fund-lumpsum", name: f.name, meta: f.cat, amount: `NAV ₹${f.nav}` })}
                wished={inWishlist(`${f.id}-lumpsum`)}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <AddToCartModal
        open={!!modalFund}
        onClose={() => setModalFund(null)}
        fund={modalFund ? { id: modalFund.id, name: modalFund.name, meta: modalFund.cat } : { id: "", name: "", meta: "" }}
      />

      {openFilter && <FilterPanel onClose={() => setOpenFilter(false)} />}
    </View>
  );
}

function FundTile({ f, onAdd, onWish, wished }: { f: FundItem; onAdd: () => void; onWish: () => void; wished: boolean }) {
  const t = useThemeColors();
  const isDebt = f.asset === "Debt";
  const metricsLabel = isDebt ? "Performance Metrics" : "Risk Metrics";
  const metrics = isDebt
    ? [
        { label: "Avg Mat", value: "6.18" }, { label: "Mod Dur", value: "4.63" }, { label: "YTM", value: "7.7" },
        { label: "SOV", value: "46.83" }, { label: "A", value: "4.28" }, { label: "AA", value: "12.18" },
      ]
    : [
        { label: "Alpha", value: f.risk.alpha }, { label: "Beta", value: f.risk.beta }, { label: "Mean", value: f.risk.mean },
        { label: "SD", value: f.risk.sd }, { label: "Sharpe", value: f.risk.sharpe }, { label: "Sortino", value: f.risk.sortino },
      ];

  return (
    <View>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
        <View style={{ width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: "rgba(193,168,107,0.3)", backgroundColor: "rgba(193,168,107,0.15)", alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 10, fontWeight: "700", color: GOLD }}>
            {f.amc.replace(/Mutual Fund/i, "").trim().split(" ").map((s) => s[0]).join("").slice(0, 3)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: t.foreground, lineHeight: 15 }}>{f.name}</Text>
          <Text style={{ fontSize: 10, color: t.mutedForeground, marginTop: 2 }}>{f.amc}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
            <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: "rgba(193,168,107,0.15)" }}>
              <Text style={{ fontSize: 8, color: GOLD, fontWeight: "600" }}>{f.rating === "Unrated" ? "Unrated" : `${f.rating}★`}</Text>
            </View>
            <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: t.background, borderWidth: 1, borderColor: t.border }}>
              <Text style={{ fontSize: 8, color: t.foreground }}>{f.cat}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 8, backgroundColor: t.background, borderWidth: 1, borderColor: t.border, borderRadius: 8, padding: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 6 }}>
          {isDebt ? <Activity size={11} color={GOLD} /> : <LineChart size={11} color={GOLD} />}
          <Text style={{ fontSize: 9, fontWeight: "600", color: t.foreground }}>{metricsLabel}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {metrics.slice(0, 6).map((m) => (
            <View key={m.label} style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 8, color: t.mutedForeground }}>{m.label}</Text>
              <Text style={{ fontSize: 9, fontWeight: "700", color: t.foreground }}>{m.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ marginTop: 6, backgroundColor: t.background, borderWidth: 1, borderColor: t.border, borderRadius: 8, padding: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 6 }}>
          <View style={{ width: 2, height: 9, backgroundColor: SUCCESS, borderRadius: 1 }} />
          <Text style={{ fontSize: 9, fontWeight: "600", color: SUCCESS }}>Returns</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {f.returns.map((r) => {
            const num = parseFloat(r.value.replace("%", ""));
            const color = isNaN(num) ? t.mutedForeground : num < 0 ? DESTRUCTIVE : SUCCESS;
            return (
              <View key={r.label} style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ fontSize: 7, color: t.mutedForeground }}>{r.label}</Text>
                <Text style={{ fontSize: 8, fontWeight: "700", color }}>{r.value}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <Text style={{ fontSize: 9, color: t.mutedForeground }}>NAV ₹{f.nav}</Text>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Pressable
            onPress={onWish}
            style={{ width: 28, height: 28, borderRadius: 8, borderWidth: 1, borderColor: wished ? GOLD : t.border, backgroundColor: wished ? "rgba(193,168,107,0.15)" : t.background, alignItems: "center", justifyContent: "center" }}
          >
            <Heart size={12} color={wished ? GOLD : t.mutedForeground} fill={wished ? GOLD : "transparent"} />
          </Pressable>
          <Pressable onPress={onAdd} style={{ backgroundColor: GOLD, flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
            <ShoppingCart size={11} color="#15171F" />
            <Text style={{ fontSize: 10, fontWeight: "700", color: "#15171F" }}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function FilterPanel({ onClose }: { onClose: () => void }) {
  const t = useThemeColors();
  const screenW = Dimensions.get("window").width;
  const panelW = screenW * 0.78;
  const translateX = useRef(new Animated.Value(panelW)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, { toValue: 0, duration: 280, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateX, { toValue: panelW, duration: 220, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
      Animated.timing(fade, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => onClose());
  };

  return (
    <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, flexDirection: "row", justifyContent: "flex-end", zIndex: 40 }}>
      <Animated.View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: t.mode === "dark" ? "rgba(21,23,31,0.8)" : "rgba(30,34,48,0.28)", opacity: fade }}>
        <Pressable onPress={handleClose} style={{ flex: 1 }} />
      </Animated.View>
      <Animated.View style={{ width: panelW, backgroundColor: t.background, borderLeftWidth: 1, borderLeftColor: t.border, transform: [{ translateX }] }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
          <View>
            <Text style={{ fontSize: 14, fontWeight: "700", color: t.foreground }}>Filters</Text>
            <Text style={{ fontSize: 10, color: t.mutedForeground }}>Refine your search</Text>
          </View>
          <Pressable onPress={handleClose} hitSlop={10}><X size={16} color={t.mutedForeground} /></Pressable>
        </View>

        <FSection title="Sort Order">
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pill label="Ascending" />
            <Pill label="Descending" active />
          </View>
        </FSection>
        <FSection title="Scheme Name">
          <Box>Search scheme name...</Box>
        </FSection>
        <FSection title="Group By"><Dropdown label="Select categories" /></FSection>
        <FSection title="Fund Ratings"><Dropdown label="Select ratings" /></FSection>
        <FSection title="Sort Criteria — Select One">
          <View style={{ gap: 8 }}>
            <Dropdown label="Returns" />
            <Dropdown label="Risk & Ratios" />
            <Dropdown label="Portfolio" />
            <Dropdown label="Debt Statistics" />
          </View>
        </FSection>

        <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
          <Pressable style={{ flex: 1, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, paddingVertical: 9, borderRadius: 8, alignItems: "center" }}>
            <Text style={{ fontSize: 11, color: t.foreground }}>Clear All</Text>
          </Pressable>
          <Pressable onPress={handleClose} style={{ flex: 1, backgroundColor: GOLD, paddingVertical: 9, borderRadius: 8, alignItems: "center" }}>
            <Text style={{ fontSize: 11, fontWeight: "600", color: "#15171F" }}>Apply</Text>
          </Pressable>
        </View>
      </ScrollView>
      </Animated.View>
    </View>
  );
}

function FSection({ title, children }: { title: string; children: React.ReactNode }) {
  const t = useThemeColors();
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 10, fontWeight: "600", color: t.foreground, marginBottom: 8 }}>{title}</Text>
      {children}
    </View>
  );
}
function Pill({ label, active }: { label: string; active?: boolean }) {
  const t = useThemeColors();
  return (
    <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: t.border, backgroundColor: active ? t.secondary : t.card }}>
      <Text style={{ fontSize: 10, color: active ? t.foreground : t.mutedForeground }}>{label}</Text>
    </View>
  );
}
function Box({ children }: { children: React.ReactNode }) {
  const t = useThemeColors();
  return (
    <View style={{ backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 }}>
      <Text style={{ fontSize: 10, color: t.mutedForeground }}>{children}</Text>
    </View>
  );
}
function Dropdown({ label }: { label: string }) {
  const t = useThemeColors();
  return (
    <View style={{ backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <Text style={{ fontSize: 10, color: t.mutedForeground }}>{label}</Text>
      <ChevronDown size={12} color={t.mutedForeground} />
    </View>
  );
}
