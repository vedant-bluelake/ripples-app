import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { X, CheckCircle2, Clock, XCircle } from "lucide-react-native";

type MandateStatus = "Active" | "Pending" | "Expired" | "Failed";

const mandates: { umrn: string; amount: string; period: string; status: MandateStatus; bank: string }[] = [
  { umrn: "HDFC1234567890", amount: "₹ 25,000", period: "01 Jan 2024 → 31 Dec 2030", status: "Active", bank: "HDFC Bank" },
  { umrn: "SBI4567890123",  amount: "₹ 10,000", period: "15 Mar 2024 → 14 Mar 2029", status: "Pending", bank: "SBI" },
  { umrn: "ICIC8901234567", amount: "₹ 5,000",  period: "01 Jun 2020 → 31 May 2024", status: "Expired", bank: "ICICI Bank" },
  { umrn: "AXIS3456789012", amount: "₹ 50,000", period: "10 Apr 2024 → 09 Apr 2034", status: "Failed",  bank: "Axis Bank" },
];

export default function MandateStatusScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: "rgba(15,17,24,0.85)", justifyContent: "flex-end" }}>
      <Pressable onPress={() => router.back()} style={{ flex: 1 }} />
      <View className="bg-background border-t border-border" style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: "90%" }}>
        <View className="flex-row items-center justify-between px-5 pt-4 pb-3 border-b border-border/60">
          <Text className="text-lg font-bold text-foreground">Mandate Status</Text>
          <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Close"><X size={16} color="#9AA1B2" /></Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, gap: 10 }}>
          {mandates.map((m) => (
            <View key={m.umrn} className="bg-secondary border border-border/60 rounded-2xl p-3.5">
              <View className="flex-row items-start justify-between">
                <View style={{ flex: 1 }}>
                  <Text className="text-[11px] text-muted-foreground">{m.bank}</Text>
                  <Text className="text-sm font-bold text-foreground mt-0.5">{m.amount}</Text>
                </View>
                <StatusPill status={m.status} />
              </View>
              <View className="flex-row items-center justify-between mt-2.5 pt-2.5 border-t border-border/50">
                <View>
                  <Text className="text-[9px] text-muted-foreground" style={{ textTransform: "uppercase", letterSpacing: 0.8 }}>Period</Text>
                  <Text className="text-[10px] text-foreground font-medium">{m.period}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text className="text-[9px] text-muted-foreground" style={{ textTransform: "uppercase", letterSpacing: 0.8 }}>UMRN</Text>
                  <Text style={{ fontSize: 10, color: "#F5F6FA", fontFamily: "monospace" }}>{m.umrn}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

function StatusPill({ status }: { status: MandateStatus }) {
  const map: Record<MandateStatus, { bg: string; fg: string; Icon: any }> = {
    Active:  { bg: "rgba(52,194,107,0.15)", fg: "#34C26B", Icon: CheckCircle2 },
    Pending: { bg: "rgba(136,121,79,0.15)", fg: "#88794F", Icon: Clock },
    Expired: { bg: "#2F3445", fg: "#9AA1B2", Icon: XCircle },
    Failed:  { bg: "rgba(229,75,75,0.15)", fg: "#E54B4B", Icon: XCircle },
  };
  const m = map[status];
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: m.bg }}>
      <m.Icon size={10} color={m.fg} />
      <Text style={{ fontSize: 9, fontWeight: "700", color: m.fg }}>{status}</Text>
    </View>
  );
}
