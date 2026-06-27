import { useState } from "react";
import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";
import { X, IndianRupee, Calendar } from "lucide-react-native";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#88794F";
const accountInfo = {
  holder: "VEDANT RAJESH KANDALKAR",
  account: "20519814898",
  bank: "State Bank of India",
  type: "SAVINGS",
};

export default function CreateMandateScreen() {
  const router = useRouter();
  const t = useThemeColors();
  const [amount, setAmount] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const canSubmit = !!(amount && start && end);

  const submit = () => {
    if (!canSubmit) return;
    toast.success("Mandate request submitted", { description: `₹${amount} · ${start} → ${end}` });
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.mode === "dark" ? "rgba(15,17,24,0.85)" : "rgba(30,34,48,0.28)", justifyContent: "flex-end" }}>
      <Pressable onPress={() => router.back()} style={{ flex: 1 }} />
      <View className="bg-background border-t border-border" style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: "90%" }}>
        <View className="flex-row items-center justify-between px-5 pt-4 pb-3 border-b border-border/60">
          <Text className="text-lg font-bold text-foreground">Create Mandate</Text>
          <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Close"><X size={16} color={t.mutedForeground} /></Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text className="text-[11px] font-bold text-foreground" style={{ letterSpacing: 0.5 }}>{accountInfo.holder}</Text>
          <Text className="text-[10px] text-muted-foreground mt-0.5">
            {accountInfo.account} | {accountInfo.bank} | {accountInfo.type}
          </Text>

          <Text className="text-[11px] font-semibold text-foreground mt-5 mb-1.5">Amount</Text>
          <View className="relative">
            <View style={{ position: "absolute", left: 12, top: 12, zIndex: 1 }}>
              <IndianRupee size={14} color={t.mutedForeground} />
            </View>
            <TextInput
              value={amount} onChangeText={setAmount}
              placeholder="Enter amount" placeholderTextColor={t.mutedForeground}
              keyboardType="numeric"
              style={{ paddingLeft: 32, paddingRight: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, color: t.foreground, fontSize: 12 }}
            />
          </View>

          <View className="flex-row mt-4" style={{ gap: 12 }}>
            <DateField label="Start Date" value={start} onChange={setStart} />
            <DateField label="End Date" value={end} onChange={setEnd} />
          </View>

          <Pressable
            onPress={submit} disabled={!canSubmit}
            style={{ marginTop: 24, paddingVertical: 14, borderRadius: 12, backgroundColor: GOLD, alignItems: "center", opacity: canSubmit ? 1 : 0.4 }}
          >
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#1F2330" }}>Create Mandate</Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const t = useThemeColors();
  return (
    <View style={{ flex: 1 }}>
      <Text className="text-[11px] font-semibold text-foreground mb-1.5">{label}</Text>
      <View className="relative">
        <View style={{ position: "absolute", left: 10, top: 12, zIndex: 1 }}>
          <Calendar size={12} color={t.mutedForeground} />
        </View>
        <TextInput
          value={value} onChangeText={onChange}
          placeholder="DD/MM/YYYY" placeholderTextColor={t.mutedForeground}
          style={{ paddingLeft: 28, paddingRight: 10, paddingVertical: 10, borderRadius: 12, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, color: t.foreground, fontSize: 11 }}
        />
      </View>
    </View>
  );
}
