import { forwardRef, useCallback, useMemo, type ReactNode } from "react";
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "@/theme/ThemeContext";

export const Sheet = forwardRef<BottomSheetModal, { children: ReactNode; snapPoints?: string[] }>(
  ({ children, snapPoints = ["60%", "90%"] }, ref) => {
    const { mode } = useTheme();
    const points = useMemo(() => snapPoints, [snapPoints]);
    const backdrop = useCallback(
      (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.6} />,
      []
    );
    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={points}
        backdropComponent={backdrop}
        backgroundStyle={{ backgroundColor: mode === "dark" ? "#262B3A" : "#FFFFFF" }}
        handleIndicatorStyle={{ backgroundColor: mode === "dark" ? "#3A3F50" : "#E1E3EA" }}
      >
        <BottomSheetView style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 24 }}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);
Sheet.displayName = "Sheet";
