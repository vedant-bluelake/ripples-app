import { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Search } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useThemeColors } from "@/theme/ThemeContext";
import { TopBar } from "@/components/TopBar";
import { BasketRowCard } from "@/components/BasketRowCard";
import { FilterBar, FilterField } from "@/components/FilterBar";
import { FilterLoadingOverlay } from "@/components/FilterLoadingOverlay";
import { baskets } from "@/data/data";

const LOADING_TEXT: Record<string, string> = {
  init: "Matching baskets to your risk profile…",
  risk: "Recalibrating baskets for your risk profile…",
  attribute: "Filtering by risk attribute…",
  horizon: "Aligning to your investment horizon…",
  amount: "Optimising for your investment amount…",
};

export default function BasketsTab() {
  const router = useRouter();
  const t = useThemeColors();
  const [loadingKey, setLoadingKey] = useState<string | null>("init");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!loadingKey) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setLoadingKey(null), 3000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [loadingKey]);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.background }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 96 }}>
      <TopBar
        title="Ripples™ Baskets"
        subtitle="Curated by in-house experts"
        onOpenWishlist={() => router.push("/wishlist")}
        onOpenCart={() => router.push("/cart")}
        onOpenProfile={() => router.push("/profile")}
      />

      <FilterBar title="Basket Discovery Engine">
        <FilterField label="Risk Profile" value="Moderate" locked />
        <FilterField label="Risk Attribute" value="Select" required />
        <FilterField label="Investment Horizon" value="Select Risk first" muted />
        <FilterField label="Investment Amt" value="For All Amounts" />
      </FilterBar>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: t.card,
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginBottom: 16,
        }}
      >
        <Search size={14} color={t.mutedForeground} />
        <Text style={{ fontSize: 11, color: t.mutedForeground }}>Search by Basket name</Text>
      </View>

      {loadingKey ? (
        <FilterLoadingOverlay text={LOADING_TEXT[loadingKey]} />
      ) : (
        baskets.map((b) => (
          <BasketRowCard key={b.id} basket={b} onPress={() => router.push(`/basket/${b.id}`)} />
        ))
      )}
    </ScrollView>
  );
}
