import { ScrollView, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Layers, Plus, TrendingUp, Users, MoreVertical } from "lucide-react-native";
import { CPTopBar } from "@/components/cp/CPTopBar";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#88794F";
const SUCCESS = "#34C26B";

const mine = [
  { name: "Steady Wealth Builder", category: "Hybrid · Moderate", returns: "+18.4%", clients: 24, status: "Live" },
  { name: "Tax Saver Smart 80C", category: "ELSS · Aggressive", returns: "+22.1%", clients: 18, status: "Live" },
  { name: "Retire Easy 2040", category: "Multi-asset", returns: "+14.6%", clients: 12, status: "Live" },
  { name: "Debt Plus Income", category: "Debt · Conservative", returns: "+9.2%", clients: 8, status: "Under Review" },
];
const summary = [
  { label: "Live", value: 3 },
  { label: "In Review", value: 1 },
  { label: "Clients", value: 62 },
];

export default function CPMyBasketsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useThemeColors();
  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      <CPTopBar title="My Investment Baskets" subtitle="View & manage your published baskets" />
      <ScrollView contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 12) + 32 }}>
        <View className="px-4 pt-3 flex-row justify-end">
          <Pressable onPress={() => router.push("/(cp)/create")} className="flex-row items-center bg-gold rounded-full px-3 py-1.5" style={{ gap: 4 }}>
            <Plus size={12} color="#1F2330" />
            <Text style={{ fontSize: 10, fontWeight: "700", color: "#1F2330" }}>New</Text>
          </Pressable>
        </View>
        <View className="px-4 pt-3 flex-row" style={{ gap: 8 }}>
          {summary.map((s) => (
            <View key={s.label} className="bg-secondary rounded-xl p-2.5 border border-border/60 items-center" style={{ flex: 1 }}>
              <Text className="text-base font-bold text-foreground">{s.value}</Text>
              <Text className="text-[9px] text-muted-foreground">{s.label}</Text>
            </View>
          ))}
        </View>
        <View className="px-4 mt-3" style={{ gap: 10 }}>
          {mine.map((b) => {
            const live = b.status === "Live";
            return (
              <View key={b.name} className="bg-secondary rounded-2xl p-3.5 border border-border/60">
                <View className="flex-row items-start justify-between">
                  <View className="flex-row items-start" style={{ gap: 10, flex: 1 }}>
                    <View style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: "rgba(136,121,79,0.20)", alignItems: "center", justifyContent: "center" }}>
                      <Layers size={16} color={GOLD} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text className="text-xs font-semibold text-foreground">{b.name}</Text>
                      <Text className="text-[10px] text-muted-foreground mt-0.5">{b.category}</Text>
                      <View
                        style={{
                          alignSelf: "flex-start", marginTop: 4, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999,
                          backgroundColor: live ? "rgba(52,194,107,0.15)" : "rgba(136,121,79,0.15)",
                        }}
                      >
                        <Text style={{ fontSize: 9, fontWeight: "700", color: live ? SUCCESS : GOLD }}>{b.status}</Text>
                      </View>
                    </View>
                  </View>
                  <Pressable hitSlop={8}><MoreVertical size={14} color="#9AA1B2" /></Pressable>
                </View>
                <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-border/40">
                  <View className="flex-row items-center" style={{ gap: 4 }}>
                    <TrendingUp size={12} color={SUCCESS} />
                    <Text className="text-[10px] text-muted-foreground">5Y</Text>
                    <Text style={{ fontSize: 12, fontWeight: "700", color: SUCCESS, marginLeft: 4 }}>{b.returns}</Text>
                  </View>
                  <View className="flex-row items-center" style={{ gap: 4 }}>
                    <Users size={12} color="#9AA1B2" />
                    <Text className="text-[10px] text-muted-foreground">{b.clients} clients</Text>
                  </View>
                  <Pressable><Text style={{ fontSize: 10, fontWeight: "700", color: GOLD }}>Manage →</Text></Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
