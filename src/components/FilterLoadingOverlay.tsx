import { useEffect, useRef } from "react";
import { View, Text, Animated, Easing, Image } from "react-native";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#C1A86B";

export function FilterLoadingOverlay({ text }: { text: string }) {
  const t = useThemeColors();
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = (val: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(val, { toValue: 1, duration: 1400, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        ])
      );
    const a = loop(pulse1, 0);
    const b = loop(pulse2, 400);
    a.start();
    b.start();
    return () => { a.stop(); b.stop(); };
  }, []);

  const ring = (val: Animated.Value, size: number) => ({
    position: "absolute" as const,
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 2,
    borderColor: GOLD,
    opacity: val.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0] }),
    transform: [{ scale: val.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1.4] }) }],
  });

  return (
    <View
      style={{
        backgroundColor: t.card,
        borderWidth: 1,
        borderColor: t.border,
        borderRadius: 16,
        paddingVertical: 36,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ width: 96, height: 96, alignItems: "center", justifyContent: "center" }}>
        <View style={{ position: "absolute", width: 96, height: 96, borderRadius: 48, borderWidth: 1, borderColor: "rgba(193,168,107,0.3)" }} />
        <View style={{ position: "absolute", width: 80, height: 80, borderRadius: 40, borderWidth: 1, borderColor: "rgba(193,168,107,0.4)" }} />
        <View style={{ position: "absolute", width: 64, height: 64, borderRadius: 32, borderWidth: 1, borderColor: "rgba(193,168,107,0.6)" }} />
        <Animated.View style={ring(pulse1, 96)} />
        <Animated.View style={ring(pulse2, 80)} />
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: GOLD,
            borderWidth: 2,
            borderColor: GOLD,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: GOLD,
            shadowOpacity: 0.6,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 0 },
          }}
        >
          <Image source={require("../../assets/basket-icon.png")} style={{ width: 28, height: 28 }} resizeMode="contain" />
        </View>
      </View>
      <Text style={{ marginTop: 20, fontSize: 12, fontWeight: "600", color: t.foreground, textAlign: "center" }}>{text}</Text>
      <Text style={{ marginTop: 4, fontSize: 10, color: t.mutedForeground, textAlign: "center" }}>
        Curating the perfect match for you…
      </Text>
    </View>
  );
}