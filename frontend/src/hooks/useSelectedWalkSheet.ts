import { useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

export const useSelectedWalkSheet = () => {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["28%", "58%", "92%"], []);

  return {
    sheetRef,
    snapPoints,
  };
};