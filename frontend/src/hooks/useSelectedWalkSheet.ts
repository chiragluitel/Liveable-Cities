import { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

export const useSelectedWalkSheet = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const [selectedNearbyId, setSelectedNearbyId] = useState<string | null>(null);

  const snapPoints = useMemo(() => ["28%", "58%", "92%"], []);

  const snapToCollapsed = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);

  const snapToMid = useCallback(() => {
    sheetRef.current?.snapToIndex(1);
  }, []);

  const snapToExpanded = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  const handleNearbyPress = useCallback((id: string, label: string) => {
    setSelectedNearbyId(id);
    console.log(`${label} pressed`);
  }, []);

  return {
    sheetRef,
    snapPoints,
    selectedNearbyId,
    snapToCollapsed,
    snapToMid,
    snapToExpanded,
    handleNearbyPress,
  };
};