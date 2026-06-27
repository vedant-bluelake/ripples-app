import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, useThemeColors } from "@/theme/ThemeContext";
import { Briefcase, Award, Moon, Sun } from "lucide-react-native";

export default function Landing() {
  const router = useRouter();
  const { mode, toggle } = useTheme();
  const t = useThemeColors();
  const goldText = t.gold;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.background }}>
      {/* Ambient gold glow — anchored to top of safe-area, no gap */}
      <View pointerEvents="none" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 360 }}>
        <LinearGradient
          colors={["rgba(184,153,104,0.22)", "rgba(184,153,104,0.06)", "transparent"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      <View className="flex-row justify-end px-4 pt-2">
        <Pressable onPress={toggle} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.secondary, alignItems: "center", justifyContent: "center" }} accessibilityLabel="Toggle theme">
          {mode === "dark" ? <Sun size={16} color={goldText} /> : <Moon size={16} color={goldText} />}
        </Pressable>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 24 }}>
        <View className="items-center mt-4 mb-8">
          <Image source={require("../assets/ripples-logo.png")} style={{ width: 220, height: 100 }} contentFit="contain" />
          <Text className="text-muted-foreground text-center text-[11px] mt-2" style={{ maxWidth: 260 }}>
            Curated MF baskets, expert guidance & 50+ DIY tools — all in one place.
          </Text>
        </View>

        <View style={{ flex: 1, justifyContent: "center", gap: 14 }}>
          <Pressable
            onPress={() => router.push({ pathname: "/auth/login", params: { role: "investor" } })}
            style={{ borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: "rgba(184,153,104,0.45)" }}
          >
            <LinearGradient
              colors={["rgba(184,153,104,0.28)", "rgba(136,121,79,0.08)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 16 }}
            >
              <View className="flex-row items-center" style={{ gap: 12 }}>
                <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(184,153,104,0.28)", alignItems: "center", justifyContent: "center" }}>
                  <Briefcase size={20} color={goldText} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text className="text-sm font-bold text-foreground">Login as Investor</Text>
                  <Text className="text-[10px] text-muted-foreground">Track & grow your portfolio</Text>
                </View>
              </View>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() => router.push({ pathname: "/auth/login", params: { role: "partner" } })}
            style={{ borderRadius: 18, padding: 16, borderWidth: 1, borderColor: t.border, backgroundColor: t.secondary }}
          >
            <View className="flex-row items-center" style={{ gap: 12 }}>
              <View style={{ width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: t.border, backgroundColor: t.card }}>
                <Award size={20} color={goldText} />
              </View>
              <View style={{ flex: 1 }}>
                <Text className="text-sm font-bold text-foreground">Login as Certified Partner</Text>
                <Text className="text-[10px] text-muted-foreground">Manage clients & strategies</Text>
              </View>
            </View>
          </Pressable>
        </View>

        <Text className="text-center text-[9px] text-muted-foreground mt-6">
          Blue Lake Capital™ · Bank-grade security
        </Text>
      </View>
    </SafeAreaView>
  );
}
