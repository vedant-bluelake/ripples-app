import { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";
import { Sparkles, ChevronDown, TrendingUp, Layers, Store, SlidersHorizontal, Star, ShieldCheck } from "lucide-react-native";
import { TopBar } from "@/components/TopBar";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#C1A86B";

type SectionKey = "basket" | "marketplace" | "diy";

const SECTIONS = [
  { key: "basket" as SectionKey, label: "Baskets", icon: Layers, subtitle: "In-house curated baskets" },
  { key: "marketplace" as SectionKey, label: "Marketplace", icon: Store, subtitle: "Certified partner baskets" },
  { key: "diy" as SectionKey, label: "D.I.Y.", icon: SlidersHorizontal, subtitle: "Individual mutual funds" },
];

const PRIORITY_PARAMS = [
  { key: "returns", label: "Higher Returns" },
  { key: "risk", label: "Lower Risk" },
  { key: "rating", label: "Higher Rating" },
  { key: "expense", label: "Lower Expense" },
  { key: "consistency", label: "Consistency" },
];

const DEFAULT_PRIORITIES: Record<string, number> = { returns: 5, risk: 3, rating: 4, expense: 2, consistency: 4 };

type State = {
  risk: string; horizon: string; asset: string; amount: string;
  specialization: string; experience: string; rating: string; amc: string; category: string;
  priorities: Record<string, number>;
};

const defaultState = (): State => ({
  risk: "Moderate", horizon: "5 - 7 Years", asset: "Equity", amount: "",
  specialization: "Equity", experience: "5+ Years", rating: "4★ & above", amc: "All AMCs", category: "Large Cap",
  priorities: { ...DEFAULT_PRIORITIES },
});

export default function ConciergeTab() {
  const router = useRouter();
  const t = useThemeColors();
  const [active, setActive] = useState<SectionKey>("basket");
  const [states, setStates] = useState<Record<SectionKey, State>>({
    basket: defaultState(), marketplace: defaultState(), diy: defaultState(),
  });
  const state = states[active];
  const setState = (patch: Partial<State>) => setStates((s) => ({ ...s, [active]: { ...s[active], ...patch } }));
  const setPriority = (k: string, v: number) =>
    setStates((s) => ({ ...s, [active]: { ...s[active], priorities: { ...s[active].priorities, [k]: v } } }));

  const current = SECTIONS.find((s) => s.key === active)!;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.background }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 96 }}>
      <TopBar
        title="Investor Concierge"
        subtitle="AI-assisted shortlist engine"
        onOpenWishlist={() => router.push("/wishlist")}
        onOpenCart={() => router.push("/cart")}
        onOpenProfile={() => router.push("/profile")}
      />

      <View style={{ borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(193,168,107,0.3)", marginBottom: 16 }}>
        <LinearGradient colors={["rgba(193,168,107,0.15)", "transparent", "transparent"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ padding: 14, flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: GOLD, alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={20} color="#15171F" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: "700", color: t.foreground }}>Curate by priority</Text>
            <Text style={{ fontSize: 9, color: t.mutedForeground }}>Pick a section, set filters, weight what matters.</Text>
          </View>
        </LinearGradient>
      </View>

      <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
        {SECTIONS.map((s) => {
          const isActive = active === s.key;
          return (
            <Pressable
              key={s.key}
              onPress={() => setActive(s.key)}
              style={{ flex: 1, borderRadius: 12, paddingVertical: 10, alignItems: "center", gap: 4, borderWidth: 1, borderColor: isActive ? GOLD : t.border, backgroundColor: isActive ? "rgba(193,168,107,0.15)" : t.card }}
            >
              <s.icon size={14} color={isActive ? GOLD : t.mutedForeground} />
              <Text style={{ fontSize: 10, fontWeight: "600", color: isActive ? t.foreground : t.mutedForeground }}>{s.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 12, fontWeight: "700", color: t.foreground }}>{current.label} Filters</Text>
        <Text style={{ fontSize: 10, color: t.mutedForeground }}>{current.subtitle}</Text>
      </View>

      <View style={{ backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 16, padding: 12, marginBottom: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <ShieldCheck size={12} color={GOLD} />
          <Text style={{ fontSize: 10, fontWeight: "600", color: t.foreground }}>Filters</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "space-between" }}>
          {active === "basket" && (
            <>
              <Select label="Risk Profile" value={state.risk} onChange={(v) => setState({ risk: v })} options={["Conservative", "Moderate", "Aggressive"]} />
              <Select label="Horizon" value={state.horizon} onChange={(v) => setState({ horizon: v })} options={["1 - 3 Years", "3 - 5 Years", "5 - 7 Years", "7+ Years"]} />
              <Select label="Asset Class" value={state.asset} onChange={(v) => setState({ asset: v })} options={["Equity", "Debt", "Hybrid", "ELSS"]} />
              <InputField label="Investment Amount" value={state.amount} onChange={(v) => setState({ amount: v })} placeholder="₹ Amount" />
            </>
          )}
          {active === "marketplace" && (
            <>
              <Select label="Specialization" value={state.specialization} onChange={(v) => setState({ specialization: v })} options={["Equity", "Debt", "Hybrid", "Multi-Asset"]} />
              <Select label="Experience" value={state.experience} onChange={(v) => setState({ experience: v })} options={["1+ Years", "3+ Years", "5+ Years", "10+ Years"]} />
              <Select label="Risk Profile" value={state.risk} onChange={(v) => setState({ risk: v })} options={["Conservative", "Moderate", "Aggressive"]} />
              <InputField label="Min AUM" value={state.amount} onChange={(v) => setState({ amount: v })} placeholder="₹ Cr" />
            </>
          )}
          {active === "diy" && (
            <>
              <Select label="Asset Class" value={state.asset} onChange={(v) => setState({ asset: v })} options={["Equity", "Debt", "Hybrid", "ELSS"]} />
              <Select label="Category" value={state.category} onChange={(v) => setState({ category: v })} options={["Large Cap", "Mid Cap", "Small Cap", "Flexi Cap", "ELSS"]} />
              <Select label="AMC" value={state.amc} onChange={(v) => setState({ amc: v })} options={["All AMCs", "HDFC", "Axis", "SBI", "ICICI", "Nippon"]} />
              <Select label="Rating" value={state.rating} onChange={(v) => setState({ rating: v })} options={["Any", "3★ & above", "4★ & above", "5★"]} />
            </>
          )}
        </View>
      </View>

      <View style={{ backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 16, padding: 12, marginBottom: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Star size={12} color={GOLD} />
          <Text style={{ fontSize: 10, fontWeight: "600", color: t.foreground }}>Set Parameter Priority</Text>
        </View>
        <Text style={{ fontSize: 9, color: t.mutedForeground, marginBottom: 12 }}>1 – low, 5 – high. The engine ranks results by your weighting.</Text>
        <View style={{ gap: 14 }}>
          {PRIORITY_PARAMS.map((p) => (
            <View key={p.key}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={{ fontSize: 10, color: t.foreground }}>{p.label}</Text>
                <Text style={{ fontSize: 10, fontWeight: "700", color: GOLD }}>{state.priorities[p.key]}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 4 }}>
                {[1, 2, 3, 4, 5].map((n) => {
                  const filled = n <= state.priorities[p.key];
                  return (
                    <Pressable
                      key={n}
                      onPress={() => setPriority(p.key, n)}
                      style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: filled ? GOLD : t.border }}
                    />
                  );
                })}
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 2 }}>
                {[1, 2, 3, 4, 5].map((n) => <Text key={n} style={{ fontSize: 8, color: t.mutedForeground, flex: 1, textAlign: "center" }}>{n}</Text>)}
              </View>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        onPress={() => toast.success("Concierge list generated", { description: `Top ${current.label} ranked by your priorities` })}
        style={{ borderRadius: 12, overflow: "hidden" }}
      >
        <LinearGradient colors={[GOLD, "#88794F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ paddingVertical: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <TrendingUp size={16} color="#15171F" />
          <Text style={{ fontSize: 12, fontWeight: "700", color: "#15171F" }}>Generate {current.label} List</Text>
        </LinearGradient>
      </Pressable>
    </ScrollView>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false);
  const t = useThemeColors();
  return (
    <View style={{ width: "48%" }}>
      <Text style={{ fontSize: 9, color: t.mutedForeground, marginBottom: 4 }}>{label}</Text>
      <Pressable onPress={() => setOpen((o) => !o)} style={{ backgroundColor: t.background, borderWidth: 1, borderColor: t.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 11, color: t.foreground }} numberOfLines={1}>{value}</Text>
        <ChevronDown size={12} color={t.mutedForeground} />
      </Pressable>
      {open && (
        <View style={{ marginTop: 4, backgroundColor: t.background, borderWidth: 1, borderColor: t.border, borderRadius: 8, overflow: "hidden" }}>
          {options.map((o) => (
            <Pressable key={o} onPress={() => { onChange(o); setOpen(false); }} style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
              <Text style={{ fontSize: 11, color: t.foreground }}>{o}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

function InputField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const t = useThemeColors();
  return (
    <View style={{ width: "48%" }}>
      <Text style={{ fontSize: 9, color: t.mutedForeground, marginBottom: 4 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={t.mutedForeground}
        style={{ backgroundColor: t.background, borderWidth: 1, borderColor: t.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, fontSize: 11, color: t.foreground }}
      />
    </View>
  );
}
