import { useRouter } from "expo-router";
import { View } from "react-native";
import { OrderListView, type ListData } from "@/components/OrderListView";
import { useApp } from "@/context/AppContext";
import { useThemeColors } from "@/theme/ThemeContext";

export default function WishlistScreen() {
  const router = useRouter();
  const { wishlist } = useApp();
  const t = useThemeColors();
  const map = (k: any) => wishlist.filter((c) => c.kind === k).map((c) => ({ name: c.name, meta: c.meta, amount: c.amount, status: "Saved", date: "" }));
  const data: ListData = {
    baskets: map("basket"),
    marketplace: map("partner"),
    diy: { lumpsum: map("fund-lumpsum"), sip: map("fund-sip") },
  };
  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      <OrderListView title="Your Wishlist" subtitle="Saved for later" data={data} onBack={() => router.back()} ctaLabel="Invest" />
    </View>
  );
}
