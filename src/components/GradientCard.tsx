import { LinearGradient } from "expo-linear-gradient";
import { View, type ViewProps } from "react-native";

export function GradientCard({ children, style, ...rest }: ViewProps) {
  return (
    <View {...rest} style={[{ borderRadius: 18, overflow: "hidden" }, style]}>
      <LinearGradient
        colors={["rgba(136,121,79,0.22)", "rgba(136,121,79,0.06)", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 16, borderWidth: 1, borderColor: "rgba(136,121,79,0.3)", borderRadius: 18 }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
