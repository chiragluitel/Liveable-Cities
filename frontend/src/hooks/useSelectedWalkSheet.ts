import { useMemo, useRef } from "react";
import { Dimensions } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSharedValue } from "react-native-reanimated";

export const useSelectedWalkSheet = () => {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["28%", "58%", "92%"], []);

  // lets the map's recentre/zoom buttons lift above the sheet
  const animatedPosition = useSharedValue(Dimensions.get("window").height);

  return {
    sheetRef,
    snapPoints,
    animatedPosition,
  };
};
