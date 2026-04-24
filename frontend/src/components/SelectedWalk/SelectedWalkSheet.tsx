import React from "react";
import BottomSheet, {
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { NearbyPlace, SelectedWalkData } from "../../types/TypesForSelectedWalk";
import SelectedWalkMeta from "./SelectedWalkMeta";
import SelectedWalkActionRow from "./SelectedWalkActionRow";
import SelectedWalkImageGallery from "./SelectedWalkImageGallery";
import SelectedWalkInfoSection from "./SelectedWalkInfoSection";
import SelectedWalkNearbyList from "./SelectedWalkNearbyList";

type Props = {
  sheetRef: React.RefObject<BottomSheet | null>;
  snapPoints: string[];
  walkData: SelectedWalkData;
  selectedNearbyId: string | null;
  onNearbyPress: (item: NearbyPlace) => void;
};

export default function SelectedWalkSheet({
  sheetRef,
  snapPoints,
  walkData,
  selectedNearbyId,
  onNearbyPress,
}: Props) {
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
        <SelectedWalkMeta
          title={walkData.title}
          distanceText={walkData.distanceText}
          durationText={walkData.durationText}
        />

        <SelectedWalkActionRow />

        {walkData.showImages && <SelectedWalkImageGallery />}

        <SelectedWalkInfoSection
          title={walkData.infoTitle}
          text={walkData.infoText}
        />

        <SelectedWalkNearbyList
          nearby={walkData.nearby}
          selectedNearbyId={selectedNearbyId}
          onNearbyPress={onNearbyPress}
        />

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