import { ScrollView, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, BookOpen, Clock } from "lucide-react-native";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#C1A86B";
const TEXT = "#F5F6FA";
const MUTED = "#9AA1B2";
const SURFACE = "#1F2330";
const BORDER = "#3A3F50";

const blogs = [
  { title: "Why SIPs Outperform Lump Sum in Volatile Markets", excerpt: "Rupee-cost averaging is the single most underrated edge for long-term investors. Here's the math behind it.", tag: "Strategy", time: "2h ago", read: "5 min read" },
  { title: "Decoding the 2026 Budget for Mutual Fund Investors", excerpt: "Capital gains, indexation, and what the new debt fund rules mean for your existing portfolio.", tag: "Policy", time: "1d ago", read: "7 min read" },
  { title: "Mid Cap vs Small Cap: Where Should Fresh Money Go?", excerpt: "A data-led look at valuations, earnings growth, and the risk-adjusted opportunity for the next 3 years.", tag: "Research", time: "3d ago", read: "6 min read" },
  { title: "Building a Tax-Efficient Portfolio at 30", excerpt: "ELSS, NPS, and asset-location tricks that compound into lakhs of additional savings by retirement.", tag: "Planning", time: "1w ago", read: "8 min read" },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useThemeColors();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.background }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: Math.max(insets.bottom, 12) + 96, paddingTop: insets.top + 8 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingBottom: 12 }}>
        <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Go back"><ArrowLeft size={16} color={t.mutedForeground} /></Pressable>
        <View>
          <Text style={{ color: t.foreground, fontSize: 16, fontWeight: "700" }}>Insights & Updates</Text>
          <Text style={{ color: t.mutedForeground, fontSize: 10 }}>Latest blogs from the desk</Text>
        </View>
      </View>
      <View style={{ gap: 12 }}>
        {blogs.map((b) => (
          <View key={b.title} style={{ backgroundColor: t.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: t.border, flexDirection: "row", gap: 12 }}>
            <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(193,168,107,0.15)", alignItems: "center", justifyContent: "center" }}>
              <BookOpen size={16} color={GOLD} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999, backgroundColor: "rgba(193,168,107,0.15)" }}>
                  <Text style={{ fontSize: 8, color: GOLD, fontWeight: "500" }}>{b.tag}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                  <Clock size={9} color={t.mutedForeground} />
                  <Text style={{ fontSize: 9, color: t.mutedForeground }}>{b.time}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 12, fontWeight: "600", color: t.foreground, lineHeight: 16 }}>{b.title}</Text>
              <Text style={{ fontSize: 10, color: t.mutedForeground, marginTop: 4, lineHeight: 14 }}>{b.excerpt}</Text>
              <Text style={{ fontSize: 9, color: GOLD, fontWeight: "500", marginTop: 8 }}>{b.read} →</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
