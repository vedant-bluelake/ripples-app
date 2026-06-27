import { ScrollView, View, type ScrollViewProps, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "@/theme/ThemeContext";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  scroll?: boolean;
  bottomInset?: number;
  horizontal?: number;
  contentContainerStyle?: ScrollViewProps["contentContainerStyle"];
} & ViewProps;

export function Screen({ children, scroll = false, bottomInset = 24, horizontal = 16, contentContainerStyle, style, ...rest }: Props) {
  const insets = useSafeAreaInsets();
  const t = useThemeColors();
  const base = { flex: 1, backgroundColor: t.background };
  const content = { paddingTop: insets.top + 8, paddingBottom: Math.max(insets.bottom, 12) + bottomInset, paddingHorizontal: horizontal };

  if (scroll) {
    return (
      <ScrollView
        {...(rest as ScrollViewProps)}
        style={[base, style]}
        contentContainerStyle={[content, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View {...rest} style={[base, content, style]}>
      {children}
    </View>
  );
}