import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Star, TrendingUp, Heart, ShoppingCart } from "lucide-react-native";
import { Tag, AmcStack } from "./Tag";
import { useApp } from "@/context/AppContext";
import { useThemeColors } from "@/theme/ThemeContext";
import type { BasketItem } from "@/data/data";
import type { MarketBasket } from "@/data/data";

const GOLD = "#C1A86B";
const SUCCESS = "#4ADE80";

type Props = {
  basket: BasketItem;
  onPress: () => void;
  partner?: MarketBasket["partner"];
};

export function BasketRowCard({ basket: b, onPress, partner }: Props) {
  const { addToCart, addToWishlist, inCart, inWishlist } = useApp();
  const t = useThemeColors();
  const meta = partner
    ? `${partner.name} · ${b.category}`
    : `${b.funds} funds · ${b.category}`;
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: t.card,
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: t.border,
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
        <View>
          {partner ? (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: GOLD,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: "700", color: "#15171F" }}>
                {partner.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "rgba(193,168,107,0.5)",
                backgroundColor: t.background,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={require("../../assets/basket-icon.png")} style={{ width: 26, height: 26 }} contentFit="contain" />
            </View>
          )}
          <View
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              backgroundColor: SUCCESS,
              borderRadius: 8,
              minWidth: 14,
              height: 14,
              paddingHorizontal: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 8, fontWeight: "700", color: "#15171F" }}>{b.funds}</Text>
          </View>
        </View>

        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
            <Text style={{ flex: 1, color: t.foreground, fontSize: 14, fontWeight: "600", lineHeight: 18 }} numberOfLines={2}>
              {b.name}
            </Text>
            {b.rating > 0 ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                <Star size={12} color={GOLD} fill={GOLD} />
                <Text style={{ color: t.foreground, fontSize: 10, fontWeight: "500" }}>{b.rating}</Text>
              </View>
            ) : (
              <Tag label={b.tag} variant="gold" />
            )}
          </View>
          {partner && (
            <Text style={{ fontSize: 9, color: t.mutedForeground, marginTop: 2 }} numberOfLines={1}>
              {partner.name} · AUM {partner.aum} · Exp {partner.exp}
            </Text>
          )}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
            <AmcStack amcs={b.amcList ?? []} total={b.amcs} />
            <Text style={{ fontSize: 9, color: t.mutedForeground }} numberOfLines={1}>
              {b.amcs} AMCs · {b.funds} funds
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
            <Tag label={b.tag} variant="gold" />
            <Tag label={b.riskTag.toUpperCase()} variant="success" />
            <Tag label={`${b.horizon} | HORIZON`} variant="outline" />
            <Tag label={b.category} variant="outline" />
          </View>
        </View>
      </View>

      <View style={{ marginTop: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 6 }}>
          <View style={{ width: 2, height: 10, backgroundColor: SUCCESS, borderRadius: 1 }} />
          <Text style={{ fontSize: 9, fontWeight: "600", color: t.foreground }}>Basket Highlights</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            backgroundColor: t.mode === "dark" ? "rgba(0,0,0,0.2)" : "rgba(136,121,79,0.06)",
            borderWidth: 1,
            borderColor: t.border,
            borderRadius: 8,
            padding: 8,
          }}
        >
          {b.highlights.slice(0, 8).map((h) => (
            <View key={h.label} style={{ width: "25%", alignItems: "center", paddingVertical: 2 }}>
              <Text style={{ fontSize: 8, color: t.mutedForeground }}>{h.label}</Text>
              <Text style={{ fontSize: 9, fontWeight: "700", color: t.foreground }}>{h.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 12,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: t.border,
        }}
      >
        <View>
          <Text style={{ fontSize: 9, color: t.mutedForeground }}>5Y Returns</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <TrendingUp size={12} color={SUCCESS} />
            <Text style={{ fontSize: 14, fontWeight: "700", color: SUCCESS }}>{b.returns}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Pressable
            onPress={() =>
              addToWishlist({ id: b.id, kind: "basket", name: b.name, meta, amount: `Min SIP ${b.minSip}` })
            }
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: inWishlist(b.id) ? GOLD : t.border,
              backgroundColor: inWishlist(b.id) ? "rgba(136,121,79,0.15)" : t.background,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Heart size={12} color={inWishlist(b.id) ? GOLD : t.mutedForeground} fill={inWishlist(b.id) ? GOLD : "transparent"} />
          </Pressable>
          <Pressable
            onPress={() =>
              addToCart({ id: b.id, kind: "basket", name: b.name, meta, amount: `Min ${b.minSip}` })
            }
            style={{
              backgroundColor: GOLD,
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 8,
            }}
          >
            <ShoppingCart size={12} color="#15171F" />
            <Text style={{ fontSize: 10, fontWeight: "700", color: "#15171F" }}>
              {inCart(b.id) ? "Added" : "Add to Cart"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
