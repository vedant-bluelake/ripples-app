import { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput, Switch } from "react-native";
import { X, ChevronDown, Calendar } from "lucide-react-native";
import { useApp, type ItemKind } from "@/context/AppContext";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#C1A86B";

type Mode = "lumpsum" | "sip";
type Fund = { id: string; name: string; meta: string };

export function AddToCartModal({
  open, onClose, fund, defaultMode = "lumpsum",
}: { open: boolean; onClose: () => void; fund: Fund; defaultMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [fundType, setFundType] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [installments, setInstallments] = useState("");
  const [payFirst, setPayFirst] = useState(false);
  const { addToCart } = useApp();
  const t = useThemeColors();

  if (!open) return null;

  const submit = () => {
    const kind: ItemKind = mode === "sip" ? "fund-sip" : "fund-lumpsum";
    addToCart({
      id: `${fund.id}-${mode}`,
      kind, name: fund.name, meta: fund.meta,
      amount: mode === "sip" ? `₹${amount || 0} / ${frequency.toLowerCase()}` : `₹${amount || 0}`,
    });
    onClose();
  };

  return (
    <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: t.mode === "dark" ? "rgba(21,23,31,0.7)" : "rgba(30,34,48,0.28)", justifyContent: "flex-end", zIndex: 50 }}>
      <Pressable onPress={onClose} style={{ flex: 1 }} />
      <View style={{ backgroundColor: t.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, borderTopWidth: 1, borderColor: t.border, maxHeight: "88%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: t.border }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: t.foreground }}>Add to Cart</Text>
          <Pressable onPress={onClose} hitSlop={10}><X size={16} color={t.mutedForeground} /></Pressable>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
          <Text style={{ fontSize: 11, color: t.mutedForeground, lineHeight: 15 }}>{fund.name}</Text>

          <View style={{ flexDirection: "row", backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 12, padding: 2 }}>
            {(["lumpsum", "sip"] as const).map((m) => (
              <Pressable
                key={m}
                onPress={() => setMode(m)}
                style={{ flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: "center", backgroundColor: mode === m ? GOLD : "transparent" }}
              >
                <Text style={{ fontSize: 11, fontWeight: "600", color: mode === m ? t.background : t.mutedForeground }}>
                  {m === "lumpsum" ? "Purchase" : "SIP"}
                </Text>
              </Pressable>
            ))}
          </View>

          <Field label="Fund Type">
            <SelectLike value={fundType} placeholder="Select the fund type" onChange={setFundType} options={["Growth", "Dividend", "Direct Growth"]} />
          </Field>

          {mode === "sip" && (
            <Field label="SIP Frequency">
              <SelectLike value={frequency} placeholder="Select frequency" onChange={setFrequency} options={["Monthly", "Quarterly", "Weekly"]} />
            </Field>
          )}

          <Field label={mode === "sip" ? "Installment Amount" : "Amount"}>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter amount"
              placeholderTextColor={t.mutedForeground}
              keyboardType="numeric"
              style={{ backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 9, fontSize: 11, color: t.foreground }}
            />
          </Field>

          {mode === "sip" && (
            <>
              <Field label="Start Date">
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 9 }}>
                  <Calendar size={12} color={t.mutedForeground} />
                  <Text style={{ fontSize: 11, color: t.mutedForeground }}>Select start date</Text>
                </View>
              </Field>

              <Field label="Number of Installments">
                <TextInput
                  value={installments}
                  onChangeText={setInstallments}
                  placeholder="Enter installments"
                  placeholderTextColor={t.mutedForeground}
                  keyboardType="numeric"
                  style={{ backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 9, fontSize: 11, color: t.foreground }}
                />
              </Field>

              <Field label="Select Mandate">
                <View style={{ borderWidth: 1, borderStyle: "dashed", borderColor: t.border, borderRadius: 12, padding: 12, gap: 8 }}>
                  <View style={{ backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 8, padding: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <View style={{ flexDirection: "row", gap: 6, flex: 1 }}>
                        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: GOLD, marginTop: 3 }} />
                        <View>
                          <Text style={{ fontSize: 11, fontWeight: "600", color: t.foreground }}>Bank of India</Text>
                          <Text style={{ fontSize: 9, color: t.mutedForeground }}>Branch: HISHABI</Text>
                        </View>
                      </View>
                      <View>
                        <Text style={{ fontSize: 11, fontWeight: "700", color: t.foreground, textAlign: "right" }}>₹20,000</Text>
                        <Text style={{ fontSize: 8, color: GOLD, textAlign: "right" }}>Max Amount</Text>
                      </View>
                    </View>
                  </View>
                  <Pressable style={{ borderWidth: 1, borderColor: t.border, borderRadius: 8, paddingVertical: 8, alignItems: "center" }}>
                    <Text style={{ fontSize: 11, color: t.foreground }}>+ Create New Mandate</Text>
                  </Pressable>
                </View>
              </Field>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Switch value={payFirst} onValueChange={setPayFirst} trackColor={{ true: GOLD, false: t.border }} thumbColor={t.foreground} />
                <Text style={{ fontSize: 11, color: t.foreground }}>Pay First Installment Now</Text>
              </View>
            </>
          )}
        </ScrollView>

        <View style={{ flexDirection: "row", gap: 8, padding: 16, paddingBottom: 24, borderTopWidth: 1, borderTopColor: t.border }}>
          <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, paddingVertical: 11, borderRadius: 12, alignItems: "center" }}>
            <Text style={{ fontSize: 11, fontWeight: "600", color: t.foreground }}>Cancel</Text>
          </Pressable>
          <Pressable onPress={submit} style={{ flex: 1, backgroundColor: GOLD, paddingVertical: 11, borderRadius: 12, alignItems: "center" }}>
            <Text style={{ fontSize: 11, fontWeight: "600", color: "#15171F" }}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const t = useThemeColors();
  return (
    <View>
      <Text style={{ fontSize: 10, color: t.mutedForeground, marginBottom: 4 }}>{label}</Text>
      {children}
    </View>
  );
}

function SelectLike({ value, placeholder, onChange, options }: { value: string; placeholder: string; onChange: (v: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false);
  const t = useThemeColors();
  return (
    <View>
      <Pressable onPress={() => setOpen((o) => !o)} style={{ backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 9, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 11, color: value ? t.foreground : t.mutedForeground }}>{value || placeholder}</Text>
        <ChevronDown size={12} color={t.mutedForeground} />
      </Pressable>
      {open && (
        <View style={{ marginTop: 4, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, borderRadius: 8, overflow: "hidden" }}>
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
