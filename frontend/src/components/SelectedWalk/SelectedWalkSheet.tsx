import React from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { SelectedWalkData } from "../../types/TypesForSelectedWalk";
import SelectedWalkTitleInfo from "./SelectedWalkTitleInfo";
import SelectedWalkActionRow from "./SelectedWalkActionRow";
import SelectedWalkImageGallery from "./SelectedWalkImageGallery";
import SelectedWalkInfoSection from "./SelectedWalkInfoSection";
import SelectedWalkNearbyList from "./SelectedWalkNearbyList";

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
      <BottomSheetScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <SelectedWalkTitleInfo
          title={selectedWalkData.title}
          distanceText={selectedWalkData.distanceText}
          durationText={selectedWalkData.durationText}
        />

        <SelectedWalkActionRow />

        {selectedWalkData.showImages && <SelectedWalkImageGallery />}

        <SelectedWalkInfoSection
          title={selectedWalkData.infoTitle}
          text={selectedWalkData.infoText}
        />

        <SelectedWalkNearbyList nearbyList={selectedWalkData.nearbyList} />

        <View style={styles.bottomSpace} />
      </BottomSheetScrollView>
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
  contentContainer: {
    paddingHorizontal: 18,
    paddingBottom: 50,
  },
  bottomSpace: {
    height: 30,
  },
});