import { useRouter } from "expo-router";
import { View } from "react-native";
import { OrderListView, type ListData } from "@/components/OrderListView";
import { useThemeColors } from "@/theme/ThemeContext";

const data: ListData = {
  baskets: [
    { name: "Wealth Builder Basket", meta: "5 funds · Moderate", amount: "₹50,000", status: "Executed", date: "12 May 2026" },
    { name: "Tax Shield Pro", meta: "3 funds · ELSS", amount: "₹25,000", status: "Pending", date: "08 May 2026" },
  ],
  marketplace: [
    { name: "Bluepeak Growth Strategy", meta: "Priya Menon · Equity", amount: "₹1,00,000", status: "Active", date: "02 May 2026" },
  ],
  diy: {
    lumpsum: [
      { name: "HDFC Mid Cap Opportunities", meta: "Equity · Mid Cap", amount: "₹30,000", status: "Executed", date: "10 May 2026" },
      { name: "Axis Bluechip Fund", meta: "Equity · Large Cap", amount: "₹15,000", status: "Executed", date: "28 Apr 2026" },
    ],
    sip: [
      { name: "Mirae Emerging Bluechip", meta: "Monthly · 10th", amount: "₹5,000 / mo", status: "Active", date: "Since Jan 2025" },
      { name: "ICICI Pru Balanced Advantage", meta: "Monthly · 1st", amount: "₹3,000 / mo", status: "Active", date: "Since Mar 2025" },
    ],
  },
};

export default function OrdersScreen() {
  const router = useRouter();
  const t = useThemeColors();
  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      <OrderListView title="My Orders" subtitle="Track all your investments" data={data} onBack={() => router.back()} ctaLabel="View" />
    </View>
  );
}
