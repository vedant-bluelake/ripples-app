import { View, Text } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "@/theme/ThemeContext";

export function CPTopBar({
  greetingName,
  title,
  subtitle,
}: { greetingName?: string; title?: string; subtitle?: string }) {
  const insets = useSafeAreaInsets();
  const t = useThemeColors();
  return (
    <View
      className="px-4 pb-3 border-b border-border"
      style={{ paddingTop: insets.top + 8 }}
    >
      {/* Single row — cropped logo + page header on left, Certified Partner badge on right */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1 min-w-0 mr-3">
          <Image
            source={require("../../../assets/basket-icon.png")}
            style={{ width: 36, height: 36 }}
            contentFit="contain"
          />
          <View className="ml-2.5 flex-1">
            {greetingName ? (
              <>
                <Text className="text-muted-foreground text-[10px]">Good Morning,</Text>
                <Text className="text-foreground text-[15px] font-bold" numberOfLines={1}>
                  {greetingName}
                </Text>
                {subtitle && (
                  <Text className="text-muted-foreground text-[10px]" numberOfLines={1}>
                    {subtitle}
                  </Text>
                )}
              </>
            ) : (
              <>
                <Text className="text-foreground text-[15px] font-bold" numberOfLines={1}>
                  {title}
                </Text>
                {subtitle && (
                  <Text className="text-muted-foreground text-[10px]" numberOfLines={1}>
                    {subtitle}
                  </Text>
                )}
              </>
            )}
          </View>
        </View>
        <View
          className="px-2 py-1 rounded-full bg-gold/15 border border-gold/30"
          style={{ borderColor: "rgba(136,121,79,0.30)", backgroundColor: "rgba(136,121,79,0.15)" }}
        >
          <Text style={{ color: t.gold }} className="text-[9px] font-semibold">
            Certified Partner
          </Text>
        </View>
      </View>
    </View>
  );
}
