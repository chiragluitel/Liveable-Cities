import React, { useMemo } from "react";
import { View } from "react-native";
import CaseyMap from "../map/CaseyMap";
import { SelectedWalkVariant } from "@Types/TypesForSelectedWalk";
import { useSelectedWalkSheet } from "@Hooks/useSelectedWalkSheet";
import { getSelectedWalkData } from "@Database/SelectedWalkMockDB";
import SelectedWalkSheet from "./SelectedWalkSheet";

type SelectedWalkScreenProps = {
  variant: SelectedWalkVariant;
  titleOverride?: string;
};

export default function SelectedWalkScreen({
  variant,
  titleOverride,
}: SelectedWalkScreenProps) {
  const { sheetRef, snapPoints } = useSelectedWalkSheet();

  const selectedWalkData = useMemo(() => {
    return getSelectedWalkData(variant, titleOverride);
  }, [variant, titleOverride]);

  return (
    <View className="flex-1 bg-background-50 dark:bg-dark-background-50">
      <CaseyMap />

      <SelectedWalkSheet
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        selectedWalkData={selectedWalkData}
      />
    </View>
  );
}