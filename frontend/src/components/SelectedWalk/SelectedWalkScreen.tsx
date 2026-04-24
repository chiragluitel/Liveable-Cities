import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import CaseyMap from "../map/CaseyMap";
import {
  SelectedWalkVariant,
  NearbyPlace,
} from "../../types/TypesForSelectedWalk";
import { getSelectedWalkData } from "./SelectedWalkData";
import { useSelectedWalkSheet } from "../../hooks/useSelectedWalkSheet";
import SelectedWalkSheet from "./SelectedWalkSheet";

type Props = {
  variant: SelectedWalkVariant;
  titleOverride?: string;
};

export default function SelectedWalkScreen({
  variant,
  titleOverride,
}: Props) {
  const {
    sheetRef,
    snapPoints,
    selectedNearbyId,
    handleNearbyPress,
  } = useSelectedWalkSheet();

  const walkData = useMemo(() => {
    return getSelectedWalkData(variant, titleOverride);
  }, [variant, titleOverride]);

  const onNearbyPress = (item: NearbyPlace) => {
    handleNearbyPress(item.id, item.label);
  };

  return (
    <View style={styles.container}>
      <CaseyMap />

      <SelectedWalkSheet
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        walkData={walkData}
        selectedNearbyId={selectedNearbyId}
        onNearbyPress={onNearbyPress}
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