import { useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Info, Plus, Check, FileEdit, Pencil } from "lucide-react-native";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#88794F";
const SUCCESS = "#34C26B";

type Profile = {
  id: string;
  name: string;
  type: "Single" | "Joint";
  bank: string;
  account: string;
  holders?: { name: string; pan: string }[];
  nominees?: { name: string; share: string }[];
  status?: "Onboarding Incomplete";
};
const PARTNER = { initials: "PA", name: "POONAM A", arn: "308748" };
const PROFILES: Profile[] = [
  { id: "BLR0000075", name: "VEDANT RAJESH KANDALKAR", type: "Joint", bank: "Bank of India", account: "1234567890987", holders: [{ name: "MADHU CHORARIA", pan: "ADBPA4567E" }] },
  { id: "BLR0000076", name: "—", type: "Single", bank: "—", account: "—", status: "Onboarding Incomplete" },
  { id: "BLR0000077", name: "MADHU CHORARIA", type: "Single", bank: "Bank of India", account: "1234567890987" },
  { id: "BLR0000078", name: "VEDANT RAJESH KANDALKAR", type: "Joint", bank: "Bank of India", account: "1234567890987", holders: [{ name: "MADHU CHORARIA", pan: "ADBPA4567E" }] },
  { id: "BLR0000080", name: "MADHU CHORARIA", type: "Single", bank: "HDFC Bank", account: "123456666666654", status: "Onboarding Incomplete" },
  { id: "BLR0000081", name: "MADHU CHORARIA", type: "Single", bank: "Bank of India", account: "3456754365434545", nominees: [{ name: "Vedant Kandalkar", share: "100%" }] },
];

export default function SwitchAccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useThemeColors();
  const [activeId, setActiveId] = useState("BLR0000075");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.background }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: Math.max(insets.bottom, 12) + 32, paddingTop: insets.top + 8 }}>
      <View className="flex-row items-center pb-3" style={{ gap: 8 }}>
        <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Go back"><ArrowLeft size={16} color={t.mutedForeground} /></Pressable>
        <Text className="text-base font-bold text-foreground">My Accounts</Text>
        <Info size={13} color={t.mutedForeground} />
      </View>

      <Text className="text-[9px] tracking-widest text-muted-foreground mb-1.5">MAPPED CERTIFIED PARTNER</Text>
      <View style={{ borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: "rgba(184,153,104,0.30)" }}>
        <LinearGradient
          colors={["rgba(184,153,104,0.18)", "rgba(184,153,104,0.04)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 12, flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: GOLD, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#fff" }}>{PARTNER.initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text className="text-[10px] text-muted-foreground">Mapped Partner</Text>
            <Text className="text-xs font-semibold text-foreground">{PARTNER.name}</Text>
          </View>
          <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: "rgba(184,153,104,0.18)" }}>
            <Text style={{ fontSize: 9, fontWeight: "700", color: GOLD }}>ARN {PARTNER.arn}</Text>
          </View>
        </LinearGradient>
      </View>

      <View className="flex-row mt-4 mb-1.5" style={{ gap: 8 }}>
        <Pressable className="flex-1 flex-row items-center justify-center bg-gold/10 border border-gold/30 rounded-xl py-2" style={{ gap: 6 }}>
          <FileEdit size={12} color={GOLD} />
          <Text className="text-[10px] font-semibold text-gold">Request Edit ARN</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/onboarding/investor")} className="flex-1 flex-row items-center justify-center bg-foreground rounded-xl py-2" style={{ gap: 6 }}>
          <Plus size={12} color={t.background} />
          <Text style={{ fontSize: 10, fontWeight: "700", color: t.background }}>Create Account</Text>
        </Pressable>
      </View>

      <Text className="text-sm font-bold text-foreground mt-2 mb-2">Select your profile</Text>

      <View className="mt-4" style={{ gap: 10 }}>
        {PROFILES.map((p) => {
          const active = p.id === activeId;
          const incomplete = !!p.status;
          return (
            <Pressable
              key={p.id}
              onPress={() => !incomplete && setActiveId(p.id)}
              style={{
                borderRadius: 14, padding: 12, borderWidth: 1,
                borderColor: active ? GOLD : t.border,
                backgroundColor: active ? "rgba(136,121,79,0.10)" : t.secondary,
                opacity: incomplete ? 0.85 : 1,
              }}
            >
              <View className="flex-row items-start justify-between">
                <View style={{ flex: 1 }}>
                  <View className="flex-row items-center" style={{ gap: 6 }}>
                    <Text className="text-xs font-semibold text-foreground">{p.name}</Text>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 1, borderRadius: 4, backgroundColor: p.type === "Joint" ? "rgba(136,121,79,0.16)" : "rgba(52,194,107,0.12)" }}>
                      <Text style={{ fontSize: 8, color: p.type === "Joint" ? GOLD : SUCCESS, fontWeight: "600" }}>{p.type}</Text>
                    </View>
                  </View>
                  <Text className="text-[10px] text-muted-foreground mt-0.5">{p.id}</Text>
                  <Text className="text-[10px] text-muted-foreground">{p.bank} · {p.account}</Text>
                  {p.holders?.map((h) => (
                    <Text key={h.pan} className="text-[10px] text-muted-foreground mt-0.5">+ Joint: {h.name} ({h.pan})</Text>
                  ))}
                  {p.nominees?.map((n) => (
                    <Text key={n.name} className="text-[10px] text-muted-foreground mt-0.5">Nominee: {n.name} · {n.share}</Text>
                  ))}
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  {active ? (
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999, backgroundColor: "rgba(52,194,107,0.15)" }}>
                      <Check size={10} color={SUCCESS} />
                      <Text style={{ fontSize: 9, fontWeight: "700", color: SUCCESS }}>Active</Text>
                    </View>
                  ) : incomplete ? (
                    <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999, backgroundColor: "rgba(136,121,79,0.20)" }}>
                      <FileEdit size={10} color={GOLD} />
                      <Text style={{ fontSize: 9, fontWeight: "700", color: GOLD }}>Complete</Text>
                    </Pressable>
                  ) : (
                    <Pressable hitSlop={6}><Pencil size={12} color={t.mutedForeground} /></Pressable>
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>

      <Pressable onPress={() => router.push("/onboarding/investor")} className="mt-4 flex-row items-center justify-center border-2 border-dashed border-border rounded-xl py-3" style={{ gap: 6 }}>
        <Plus size={14} color={GOLD} />
        <Text style={{ fontSize: 12, fontWeight: "700", color: GOLD }}>Create New Account</Text>
      </Pressable>
    </ScrollView>
  );
}
