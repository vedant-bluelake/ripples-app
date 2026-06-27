import { Text, View } from "react-native";
import { useThemeColors } from "@/theme/ThemeContext";

export function Tag({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "gold" | "success" | "destructive" | "outline";
}) {
  const t = useThemeColors();
  const styles: Record<string, { bg: string; fg: string; bd?: string }> = {
    default: { bg: t.secondary, fg: t.foreground },
    gold: { bg: "rgba(193,168,107,0.20)", fg: "#C1A86B" },
    success: { bg: "rgba(74,222,128,0.15)", fg: "#4ADE80" },
    destructive: { bg: "rgba(248,113,113,0.15)", fg: "#F87171" },
    outline: { bg: "transparent", fg: t.mutedForeground, bd: t.border },
  };
  const s = styles[variant];
  return (
    <View
      style={{
        backgroundColor: s.bg,
        borderColor: s.bd,
        borderWidth: s.bd ? 1 : 0,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ color: s.fg, fontSize: 9, fontWeight: "700" }}>{label}</Text>
    </View>
  );
}

export function AmcStack({ amcs, total }: { amcs: string[]; total: number }) {
  const t = useThemeColors();
  const shown = amcs.slice(0, 3);
  const extra = Math.max(0, total - shown.length);
  const palette = ["#C1A86B", "#4ADE80", "#2D3242"];
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {shown.map((a, i) => (
        <View
          key={a + i}
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: palette[i % palette.length],
            borderWidth: 1,
            borderColor: t.background,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: i === 0 ? 0 : -6,
          }}
        >
          <Text style={{ fontSize: 8, fontWeight: "700", color: "#15171F" }}>
            {a.slice(0, 2).toUpperCase()}
          </Text>
        </View>
      ))}
      {extra > 0 && (
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: t.background,
            borderWidth: 1,
            borderColor: t.border,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: -6,
          }}
        >
          <Text style={{ fontSize: 8, fontWeight: "700", color: t.foreground }}>+{extra}</Text>
        </View>
      )}
    </View>
  );
}
