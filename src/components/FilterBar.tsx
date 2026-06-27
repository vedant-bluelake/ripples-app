import { View, Text, Pressable } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { useThemeColors } from "@/theme/ThemeContext";

const GOLD = "#C1A86B";

export function FilterField({
  label,
  value,
  locked,
  required,
  muted,
}: {
  label: string;
  value: string;
  locked?: boolean;
  required?: boolean;
  muted?: boolean;
}) {
  const t = useThemeColors();
  return (
    <View style={{ width: "48%" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 4 }}>
        <Text style={{ fontSize: 9, color: t.mutedForeground }}>{label}</Text>
        {locked && <Text style={{ fontSize: 8, color: t.mutedForeground }}>🔒</Text>}
        {required && <Text style={{ fontSize: 10, color: GOLD }}>•</Text>}
      </View>
      <View
        style={{
          backgroundColor: t.background,
          borderWidth: 1,
          borderColor: t.border,
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 7,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: muted ? 0.6 : 1,
        }}
      >
        <Text style={{ fontSize: 10, color: t.foreground }} numberOfLines={1}>{value}</Text>
        <ChevronDown size={12} color={t.mutedForeground} />
      </View>
    </View>
  );
}

export function FilterBar({
  title,
  children,
  primaryLabel = "Show My Basket",
}: {
  title: string;
  children: React.ReactNode;
  primaryLabel?: string;
}) {
  const t = useThemeColors();
  return (
    <View
      style={{
        backgroundColor: t.card,
        borderWidth: 1,
        borderColor: t.border,
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
      }}
    >
      <Text style={{ fontSize: 10, fontWeight: "600", color: t.foreground, marginBottom: 8 }}>{title}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "space-between" }}>
        {children}
      </View>
      <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: t.secondary,
            borderWidth: 1,
            borderColor: t.border,
            borderRadius: 8,
            paddingVertical: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: "600", color: t.foreground }}>{primaryLabel}</Text>
        </Pressable>
        <Pressable
          style={{
            paddingHorizontal: 12,
            backgroundColor: t.background,
            borderWidth: 1,
            borderColor: t.border,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 11, color: t.mutedForeground }}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
