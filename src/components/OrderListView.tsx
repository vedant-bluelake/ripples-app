import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Layers, Store, SlidersHorizontal, TrendingUp, Calendar, IndianRupee } from "lucide-react-native";
import { useThemeColors } from "@/theme/ThemeContext";

type Section = "baskets" | "marketplace" | "diy";
type DiySub = "lumpsum" | "sip";
export type OrderItem = { name: string; meta: string; amount: string; status: string; date: string };
export type ListData = {
  baskets: OrderItem[];
  marketplace: OrderItem[];
  diy: { lumpsum: OrderItem[]; sip: OrderItem[] };
};

export function OrderListView({
  title, subtitle, data, onBack, ctaLabel,
}: { title: string; subtitle: string; data: ListData; onBack: () => void; ctaLabel?: string }) {
  const [section, setSection] = useState<Section>("baskets");
  const [diySub, setDiySub] = useState<DiySub>("lumpsum");
  const insets = useSafeAreaInsets();
  const t = useThemeColors();
  const items =
    section === "baskets" ? data.baskets :
    section === "marketplace" ? data.marketplace :
    diySub === "lumpsum" ? data.diy.lumpsum : data.diy.sip;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.background }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: Math.max(insets.bottom, 12) + 96, paddingTop: insets.top + 8 }}>
      <View className="pb-3 flex-row items-center gap-2">
        <Pressable onPress={onBack} className="p-1 -ml-1" accessibilityRole="button" accessibilityLabel="Go back"><ArrowLeft size={16} color={t.mutedForeground} /></Pressable>
        <View>
          <Text className="text-base font-bold text-foreground">{title}</Text>
          <Text className="text-[10px] text-muted-foreground">{subtitle}</Text>
        </View>
      </View>

      <View className="flex-row gap-1.5 bg-secondary rounded-xl p-1 mb-3">
        {([
          { k: "baskets" as const, l: "Baskets", I: Layers },
          { k: "marketplace" as const, l: "Marketplace", I: Store },
          { k: "diy" as const, l: "DIY", I: SlidersHorizontal },
        ]).map((t) => {
          const active = section === t.k;
          return (
            <Pressable
              key={t.k}
              onPress={() => setSection(t.k)}
              className={`flex-1 flex-row items-center justify-center gap-1 py-1.5 rounded-lg ${active ? "bg-gold" : ""}`}
            >
              <t.I size={12} color={active ? "#1F2330" : "#9AA1B2"} />
              <Text className={`text-[10px] font-semibold ${active ? "text-accent-foreground" : "text-muted-foreground"}`}>{t.l}</Text>
            </Pressable>
          );
        })}
      </View>

      {section === "diy" && (
        <View className="flex-row gap-2 mb-3">
          {([
            { k: "lumpsum" as const, l: "Lumpsum", I: IndianRupee },
            { k: "sip" as const, l: "SIP", I: Calendar },
          ]).map((t) => {
            const active = diySub === t.k;
            return (
              <Pressable
                key={t.k}
                onPress={() => setDiySub(t.k)}
                className={`flex-1 flex-row items-center justify-center gap-1 py-1.5 rounded-lg border ${
                  active ? "border-gold/40 bg-gold/15" : "bg-secondary border-border"
                }`}
              >
                <t.I size={12} color={active ? "#88794F" : "#9AA1B2"} />
                <Text className={`text-[10px] font-medium ${active ? "text-gold" : "text-muted-foreground"}`}>{t.l}</Text>
              </Pressable>
            );
          })}
        </View>
      )}

      <View className="gap-2.5">
        {items.length === 0 ? (
          <View className="bg-secondary rounded-xl p-6 items-center border border-border">
            <Text className="text-[11px] text-muted-foreground">Nothing here yet</Text>
          </View>
        ) : (
          items.map((it, i) => (
            <View key={i} className="bg-secondary rounded-xl p-3 border border-border">
              <View className="flex-row items-start justify-between gap-2">
                <View className="flex-1">
                  <Text className="text-xs font-semibold text-foreground">{it.name}</Text>
                  <Text className="text-[10px] text-muted-foreground mt-0.5">{it.meta}</Text>
                </View>
                <View className="px-1.5 py-0.5 rounded-full bg-gold/15">
                  <Text className="text-[9px] text-gold font-medium">{it.status}</Text>
                </View>
              </View>
              <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-border">
                <View className="flex-row items-center gap-1">
                  <TrendingUp size={12} color="#34C26B" />
                  <Text className="text-xs font-semibold text-foreground">{it.amount}</Text>
                </View>
                <Text className="text-[10px] text-muted-foreground">{it.date}</Text>
                {ctaLabel && (
                  <Pressable className="bg-gold px-3 py-1 rounded-lg">
                    <Text className="text-[10px] font-semibold text-accent-foreground">{ctaLabel}</Text>
                  </Pressable>
                )}
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
