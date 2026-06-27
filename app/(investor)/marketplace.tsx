import { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Search } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useThemeColors } from "@/theme/ThemeContext";
import { TopBar } from "@/components/TopBar";
import { BasketRowCard } from "@/components/BasketRowCard";
import { FilterBar, FilterField } from "@/components/FilterBar";
import { FilterLoadingOverlay } from "@/components/FilterLoadingOverlay";
import { marketplaceBaskets } from "@/data/data";

const LOADING_TEXT: Record<string, string> = {
  init: "Finding partners that match your profile…",
  specialization: "Filtering by specialization…",
  experience: "Matching partner experience…",
  aum: "Filtering by minimum AUM…",
  location: "Narrowing by location…",
};

export default function MarketplaceTab() {
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
        title="Marketplace"
        subtitle="Baskets curated by certified partners"
        onOpenWishlist={() => router.push("/wishlist")}
        onOpenCart={() => router.push("/cart")}
        onOpenProfile={() => router.push("/profile")}
      />

      <FilterBar title="Partner Discovery Engine" primaryLabel="Show Partners">
        <FilterField label="Specialization" value="Equity" />
        <FilterField label="Experience" value="5+ Years" />
        <FilterField label="Min AUM" value="₹50 Cr" />
        <FilterField label="Location" value="All India" />
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
        <Text style={{ fontSize: 11, color: t.mutedForeground }}>Search basket or partner</Text>
      </View>

      {loadingKey ? (
        <FilterLoadingOverlay text={LOADING_TEXT[loadingKey]} />
      ) : (
        marketplaceBaskets.map((b) => (
          <BasketRowCard
            key={b.id}
            basket={b}
            partner={b.partner}
            onPress={() => router.push(`/basket/${b.id}`)}
          />
        ))
      )}
    </ScrollView>
  );
}
