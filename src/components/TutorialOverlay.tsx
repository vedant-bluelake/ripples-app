import { useState } from "react";
import { View, Text, Pressable, Modal, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X, ChevronRight, ChevronLeft } from "lucide-react-native";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#88794F";

type Step = { title: string; body: string };
const steps: Step[] = [
  { title: "Welcome to RIPPLES™", body: "Quick 60-second tour. Let's walk you through the main areas of the app." },
  { title: "Home", body: "Your dashboard — holdings, top performers, and quick actions live here." },
  { title: "Baskets", body: "Curated investment baskets, built and managed by RIPPLES." },
  { title: "Marketplace", body: "Baskets crafted by SEBI-certified partners. Browse, compare, invest." },
  { title: "DIY", body: "Pick your own mutual funds — full control with lumpsum or SIP." },
  { title: "Concierge", body: "Talk to a human advisor or our AI concierge for personalised picks." },
  { title: "Your profile", body: "Tap the avatar to open Settings, Switch Account, Orders and more." },
  { title: "Wishlist & Cart", body: "Save what you love, checkout in one go from the cart." },
  { title: "You're all set", body: "Explore at your own pace. Replay this tour anytime from Profile → Settings." },
];

export function TutorialOverlay({ onClose }: { onClose: () => void }) {
  const [i, setI] = useState(0);
  const last = i === steps.length - 1;
  const step = steps[i];
  const { width } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const t = useThemeColors();

  return (
    <Modal transparent animationType="fade" visible onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "rgba(15,17,24,0.85)", justifyContent: "center", paddingHorizontal: 20 }}>
        <Pressable onPress={onClose} hitSlop={10}
          style={{ position: "absolute", top: insets.top + 12, right: 16, zIndex: 10, padding: 8, borderRadius: 999, backgroundColor: t.overlay, borderWidth: 1, borderColor: t.border }}>
          <X size={14} color={t.foreground} />
        </Pressable>

        <View style={{ width: Math.min(width - 40, 320), alignSelf: "center", backgroundColor: t.card, borderWidth: 1, borderColor: "rgba(136,121,79,0.30)", borderRadius: 20, padding: 18 }}>
          <Text style={{ fontSize: 9, fontWeight: "700", color: GOLD, letterSpacing: 1, textTransform: "uppercase" }}>
            Step {i + 1} / {steps.length}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "700", color: t.foreground, marginTop: 4 }}>{step.title}</Text>
          <Text style={{ fontSize: 12, color: t.mutedForeground, marginTop: 8, lineHeight: 17 }}>{step.body}</Text>

          <View style={{ flexDirection: "row", gap: 4, marginTop: 14 }}>
            {steps.map((_, idx) => (
              <View key={idx} style={{ height: 4, borderRadius: 2, width: idx === i ? 20 : 6, backgroundColor: idx === i ? GOLD : t.border }} />
            ))}
          </View>

          <View style={{ flexDirection: "row", gap: 8, marginTop: 14 }}>
            {i > 0 && (
              <Pressable onPress={() => setI(i - 1)}
                style={{ paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: t.border, backgroundColor: t.secondary, alignItems: "center", justifyContent: "center" }}>
                <ChevronLeft size={14} color={t.foreground} />
              </Pressable>
            )}
            <Pressable onPress={onClose}
              style={{ flex: 1, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: t.border, backgroundColor: t.secondary, alignItems: "center" }}>
              <Text style={{ fontSize: 11, fontWeight: "500", color: t.foreground }}>Skip tour</Text>
            </Pressable>
            <Pressable onPress={() => (last ? onClose() : setI(i + 1))}
              style={{ flex: 1, flexDirection: "row", paddingVertical: 10, borderRadius: 12, backgroundColor: GOLD, alignItems: "center", justifyContent: "center", gap: 4 }}>
              <Text style={{ fontSize: 11, fontWeight: "700", color: "#1F2330" }}>{last ? "Done" : "Next"}</Text>
              {!last && <ChevronRight size={14} color="#1F2330" />}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
