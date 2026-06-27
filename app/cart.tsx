import { useRouter } from "expo-router";
import { View } from "react-native";
import { OrderListView, type ListData } from "@/components/OrderListView";
import { useApp } from "@/context/AppContext";
import { useThemeColors } from "@/theme/ThemeContext";

export default function CartScreen() {
  const router = useRouter();
  const { cart } = useApp();
  const t = useThemeColors();
  const map = (k: any) => cart.filter((c) => c.kind === k).map((c) => ({ name: c.name, meta: c.meta, amount: c.amount, status: "In cart", date: "Added" }));
  const data: ListData = {
    baskets: map("basket"),
    marketplace: map("partner"),
    diy: { lumpsum: map("fund-lumpsum"), sip: map("fund-sip") },
  };
  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      <OrderListView title="Your Cart" subtitle="Review before checkout" data={data} onBack={() => router.back()} ctaLabel="Checkout" />
    </View>
  );
}
