import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Heart, ShoppingCart } from "lucide-react-native";
import { useApp } from "@/context/AppContext";
import { useThemeColors } from "@/theme/ThemeContext";

export function TopBar({
  greetingName,
  title,
  subtitle,
  onOpenWishlist,
  onOpenCart,
  onOpenProfile,
  initials = "RS",
}: {
  greetingName?: string;
  title?: string;
  subtitle?: string;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  initials?: string;
}) {
  const { cart, wishlist } = useApp();
  const insets = useSafeAreaInsets();
  const t = useThemeColors();
  return (
    <View className="pb-3 px-4" style={{ paddingTop: insets.top + 8 }}>
      <View className="flex-row items-center justify-between h-10">
        <View className="flex-row items-center flex-1 min-w-0">
          <Image
            source={require("../../assets/basket-icon.png")}
            style={{ width: 40, height: 40 }}
            contentFit="contain"
          />
          <View className="ml-2.5 flex-1">
            {greetingName ? (
              <>
                <Text className="text-muted-foreground text-[10px]">Good Morning</Text>
                <Text className="text-foreground text-[15px] font-bold" numberOfLines={1}>{greetingName}</Text>
              </>
            ) : (
              <>
                <Text className="text-foreground text-[15px] font-bold" numberOfLines={1}>{title}</Text>
                {subtitle && <Text className="text-muted-foreground text-[10px]" numberOfLines={1}>{subtitle}</Text>}
              </>
            )}
          </View>
        </View>
        <Pressable
          onPress={onOpenProfile}
          className="w-10 h-10 rounded-full bg-gold items-center justify-center"
          accessibilityLabel="Profile"
        >
          <Text className="text-[12px] font-bold text-accent-foreground">{initials}</Text>
        </Pressable>
      </View>
      <View className="flex-row justify-end mt-2">
        <Pressable onPress={onOpenWishlist} className="w-8 h-8 rounded-full items-center justify-center relative" accessibilityLabel="Wishlist">
          <Heart size={16} color={t.foreground} />
          {wishlist.length > 0 && (
            <View className="absolute -top-0.5 -right-0.5 bg-gold rounded-full w-3.5 h-3.5 items-center justify-center">
              <Text className="text-[8px] font-bold text-accent-foreground">{wishlist.length}</Text>
            </View>
          )}
        </Pressable>
        <Pressable onPress={onOpenCart} className="w-8 h-8 rounded-full items-center justify-center relative ml-1" accessibilityLabel="Cart">
          <ShoppingCart size={16} color={t.foreground} />
          {cart.length > 0 && (
            <View className="absolute -top-0.5 -right-0.5 bg-gold rounded-full w-3.5 h-3.5 items-center justify-center">
              <Text className="text-[8px] font-bold text-accent-foreground">{cart.length}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}
