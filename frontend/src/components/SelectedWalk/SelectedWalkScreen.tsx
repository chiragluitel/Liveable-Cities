import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
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
    <View style={styles.container}>
      <CaseyMap />

      <SelectedWalkSheet
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        selectedWalkData={selectedWalkData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});