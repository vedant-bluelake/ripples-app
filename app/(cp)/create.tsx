import { useState } from "react";
import { ScrollView, View, Text, Pressable, TextInput } from "react-native";
import { toast } from "sonner-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Check, RotateCcw, Sparkles } from "lucide-react-native";
import { CPTopBar } from "@/components/cp/CPTopBar";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#88794F";

const RISKS = ["Conservative", "Moderate", "Aggressive"] as const;
type Risk = typeof RISKS[number];

const ATTRS: Record<Risk, { id: string; label: string; desc: string }[]> = {
  Conservative: [
    { id: "low", label: "Low Risk", desc: "Focuses on 90% Low risk and 10% Moderate risk assets" },
    { id: "lm", label: "Low to Moderate Risk", desc: "Focuses on 75% Low risk and 25% High risk assets" },
  ],
  Moderate: [
    { id: "m1", label: "Moderate Risk I", desc: "Balances 55% Low risk and 45% High risk assets" },
    { id: "m2", label: "Moderate Risk II", desc: "Blend of 55% Moderate risk and 45% High risk" },
  ],
  Aggressive: [
    { id: "a1", label: "Aggressive I", desc: "70% High risk equity, 30% Mid-cap exposure" },
    { id: "a2", label: "Aggressive II", desc: "90% High risk equity, 10% Thematic plays" },
  ],
};
const STRATS = [
  { id: "s1", label: "Moderate Equity Baskets I", desc: "Horizon >5Y. Long-term balanced growth." },
  { id: "s2", label: "Hybrid Conservative Funds", desc: "Mix of debt-heavy hybrid funds." },
  { id: "s3", label: "Flexi-Cap Diversified", desc: "Across large, mid & small caps." },
];
const FUNDS = [
  { id: "f1", name: "Aditya Birla SL Arbitrage Fund Reg (G)", amc: "ABSL MF" },
  { id: "f2", name: "Aditya Birla SL Financial Planning FOF (G)", amc: "ABSL MF" },
  { id: "f3", name: "Aditya Birla SL Regular Savings Fund (G)", amc: "ABSL MF" },
  { id: "f4", name: "Axis Arbitrage Fund (G)", amc: "Axis MF" },
  { id: "f5", name: "Axis Conservative Hybrid Fund (G)", amc: "Axis MF" },
  { id: "f6", name: "360 One Flexi Cap Fund Reg (G)", amc: "360 ONE MF" },
];

const STEPS = ["Risk", "Profile", "Strategy", "Funds", "Name"] as const;

export default function CPCreateBasketScreen() {
  const insets = useSafeAreaInsets();
  const t = useThemeColors();
  const [step, setStep] = useState(0);
  const [risk, setRisk] = useState<Risk>("Moderate");
  const [attr, setAttr] = useState("m1");
  const [strat, setStrat] = useState("s1");
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [name, setName] = useState("");

  const reset = () => { setStep(0); setRisk("Moderate"); setAttr("m1"); setStrat("s1"); setSelected({}); setName(""); };
  const toggleFund = (id: string) => setSelected((s) => {
    const next = { ...s };
    if (id in next) delete next[id]; else next[id] = 0;
    return next;
  });
  const setAlloc = (id: string, v: string) => {
    const n = Math.max(0, Math.min(100, parseInt(v || "0", 10) || 0));
    setSelected((s) => ({ ...s, [id]: n }));
  };
  const total = Object.values(selected).reduce((a, b) => a + (b || 0), 0);
  const canNext =
    (step === 0 && !!risk) ||
    (step === 1 && !!attr) ||
    (step === 2 && !!strat) ||
    (step === 3 && Object.keys(selected).length >= 2 && total === 100) ||
    (step === 4 && name.trim().length > 2);
  const next = () => {
    if (step === STEPS.length - 1) {
      toast.success("Basket published", { description: `"${name}" sent for review` });
      reset(); return;
    }
    setStep((s) => s + 1);
  };

  return (
    <View className="flex-1 bg-background">
      <CPTopBar title="Create Basket" subtitle="Build your customized investment portfolio" />
      <ScrollView contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 12) + 120 }}>
        <View className="px-4 pt-3 flex-row justify-end">
          <Pressable onPress={reset} className="flex-row items-center border border-border rounded-full px-2.5 py-1" style={{ gap: 4 }}>
            <RotateCcw size={12} color={t.mutedForeground} />
            <Text className="text-[10px] text-muted-foreground">Reset</Text>
          </Pressable>
        </View>

        {/* Stepper */}
        <View className="px-4 pt-4">
          <View className="flex-row items-center">
            {STEPS.map((s, i) => (
              <View key={s} className="flex-1 flex-row items-center">
                <View
                  style={{
                    width: 24, height: 24, borderRadius: 12,
                    backgroundColor: i <= step ? GOLD : t.secondary,
                    borderWidth: i <= step ? 0 : 1, borderColor: t.border,
                    alignItems: "center", justifyContent: "center",
                  }}
                >
                  {i < step ? <Check size={12} color="#1F2330" /> :
                    <Text style={{ fontSize: 10, fontWeight: "700", color: i <= step ? t.background : t.mutedForeground }}>{i + 1}</Text>}
                </View>
                {i < STEPS.length - 1 && (
                  <View style={{ flex: 1, height: 1, marginHorizontal: 4, backgroundColor: i < step ? GOLD : t.border }} />
                )}
              </View>
            ))}
          </View>
          <View className="flex-row justify-between mt-1.5">
            {STEPS.map((s, i) => (
              <Text key={s} style={{ fontSize: 9, color: i === step ? GOLD : t.mutedForeground, fontWeight: i === step ? "700" : "400" }}>{s}</Text>
            ))}
          </View>
        </View>

        <View className="px-4 mt-5" style={{ gap: 16 }}>
          {step === 0 && (
            <Section title="Select Risk Profile" subtitle="Choose the overall risk appetite for this basket">
              {RISKS.map((r) => (
                <OptionCard key={r} active={risk === r} onPress={() => setRisk(r)}>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs font-semibold text-foreground">{r}</Text>
                    {risk === r && <Check size={16} color={GOLD} />}
                  </View>
                </OptionCard>
              ))}
            </Section>
          )}

          {step === 1 && (
            <Section title="Risk Attribute" subtitle={`Refine for ${risk} investors`}>
              {ATTRS[risk].map((a) => (
                <OptionCard key={a.id} active={attr === a.id} onPress={() => setAttr(a.id)}>
                  <Text className="text-xs font-semibold text-foreground">{a.label}</Text>
                  <Text className="text-[10px] text-muted-foreground mt-0.5">{a.desc}</Text>
                </OptionCard>
              ))}
            </Section>
          )}

          {step === 2 && (
            <Section title="Strategy / Horizon" subtitle="Pick the investment thesis">
              {STRATS.map((s) => (
                <OptionCard key={s.id} active={strat === s.id} onPress={() => setStrat(s.id)}>
                  <Text className="text-xs font-semibold text-foreground">{s.label}</Text>
                  <Text className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</Text>
                </OptionCard>
              ))}
            </Section>
          )}

          {step === 3 && (
            <Section title="Pick Funds & Allocation" subtitle={`Select ≥2 funds, allocations must total 100% (now ${total}%)`}>
              {FUNDS.map((f) => {
                const sel = f.id in selected;
                return (
                  <View key={f.id} className="rounded-xl border p-3" style={{ borderColor: sel ? GOLD : t.border, backgroundColor: t.secondary }}>
                    <Pressable onPress={() => toggleFund(f.id)} className="flex-row items-center justify-between">
                      <View style={{ flex: 1, paddingRight: 8 }}>
                        <Text className="text-xs font-semibold text-foreground">{f.name}</Text>
                        <Text className="text-[10px] text-muted-foreground mt-0.5">{f.amc}</Text>
                      </View>
                      <View style={{
                        width: 18, height: 18, borderRadius: 4, borderWidth: 1,
                        borderColor: sel ? GOLD : t.border,
                        backgroundColor: sel ? GOLD : "transparent",
                        alignItems: "center", justifyContent: "center",
                      }}>
                        {sel && <Check size={12} color="#1F2330" />}
                      </View>
                    </Pressable>
                    {sel && (
                      <View className="flex-row items-center mt-2.5 pt-2.5 border-t border-border/40" style={{ gap: 8 }}>
                        <Text className="text-[10px] text-muted-foreground">Allocation %</Text>
                        <TextInput
                          value={String(selected[f.id] || "")}
                          onChangeText={(v) => setAlloc(f.id, v)}
                          keyboardType="numeric"
                          placeholder="0"
                          placeholderTextColor={t.mutedForeground}
                          style={{ flex: 1, color: t.foreground, fontSize: 12, borderWidth: 1, borderColor: t.border, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 6, backgroundColor: t.card }}
                        />
                      </View>
                    )}
                  </View>
                );
              })}
            </Section>
          )}

          {step === 4 && (
            <Section title="Name Your Basket" subtitle="Give it a memorable, descriptive name">
              <TextInput
                value={name} onChangeText={setName}
                placeholder="e.g. Steady Wealth Builder"
                placeholderTextColor={t.mutedForeground}
                style={{ borderWidth: 1, borderColor: t.border, borderRadius: 12, backgroundColor: t.secondary, color: t.foreground, fontSize: 13, paddingHorizontal: 12, paddingVertical: 12 }}
              />
              <View className="flex-row items-start mt-3 bg-gold/5 border border-gold/20 rounded-xl p-2.5" style={{ gap: 6 }}>
                <Sparkles size={12} color={GOLD} />
                <Text className="text-[10px] text-muted-foreground" style={{ flex: 1, lineHeight: 14 }}>
                  Your basket goes through a quick compliance review (typically 24 hours) before going live in the Marketplace.
                </Text>
              </View>
            </Section>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
        <View className="absolute left-0 right-0 bottom-0 bg-background border-t border-border px-4 py-3 flex-row" style={{ gap: 8, paddingBottom: Math.max(insets.bottom, 12), backgroundColor: t.overlay, borderTopColor: t.border }}>
        {step > 0 && (
          <Pressable onPress={() => setStep((s) => s - 1)} className="flex-1 border border-border rounded-xl py-3 items-center">
            <Text className="text-xs font-semibold text-foreground">Back</Text>
          </Pressable>
        )}
        <Pressable
          onPress={next} disabled={!canNext}
          style={{ flex: 2, opacity: canNext ? 1 : 0.4, backgroundColor: GOLD, borderRadius: 12, paddingVertical: 12, alignItems: "center" }}
        >
          <Text style={{ fontSize: 12, fontWeight: "700", color: "#1F2330" }}>
            {step === STEPS.length - 1 ? "Publish Basket" : "Continue"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function Section({ title, subtitle, children }: any) {
  return (
    <View>
      <Text className="text-[11px] font-semibold text-foreground">{title}</Text>
      {subtitle && <Text className="text-[10px] text-muted-foreground mt-0.5 mb-2.5">{subtitle}</Text>}
      <View style={{ gap: 8 }}>{children}</View>
    </View>
  );
}
function OptionCard({ active, onPress, children }: any) {
  const t = useThemeColors();
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderRadius: 12, padding: 12, borderWidth: 1,
        borderColor: active ? GOLD : t.border,
        backgroundColor: active ? "rgba(136,121,79,0.10)" : t.secondary,
      }}
    >{children}</Pressable>
  );
}
