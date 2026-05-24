import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { SelectedWalkData } from "../../types/walkDetailTypes";
import SelectedWalkContent from "./SelectedWalkContent";

type SelectedWalkSheetProps = {
  sheetRef: React.RefObject<BottomSheet | null>;
  snapPoints: string[];
  selectedWalkData: SelectedWalkData;
};

export default function SelectedWalkSheet({
  sheetRef,
  snapPoints,
  selectedWalkData,
}: SelectedWalkSheetProps) {
  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.background}
    >
      <SelectedWalkContent walk={selectedWalkData} />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#eef0ec",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  handleIndicator: {
    width: 64,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#a8a8a8",
  },
});
