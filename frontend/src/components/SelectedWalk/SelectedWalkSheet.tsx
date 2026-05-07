import React from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { SelectedWalkData } from "../../types/TypesForSelectedWalk";
import SelectedWalkTitleInfo from "./SelectedWalkTitleInfo";
import SelectedWalkActionRow from "./SelectedWalkActionRow";
import SelectedWalkImageGallery from "./SelectedWalkImageGallery";
import SelectedWalkInfoSection from "./SelectedWalkInfoSection";
import SelectedWalkNearbyList from "./SelectedWalkNearbyList";
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";


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
	const { colorScheme } = useColorScheme();
	const isLight = colorScheme === "light";
  
  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: isLight ? colours.background[800] : colours.dark.background[800] }}
      backgroundStyle={{backgroundColor: isLight ? colours.background[50] : colours.dark.background[200]}}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingBottom: 50,
        }}
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
          selectedFilters={selectedWalkData.selectedFilters}
        />

        <SelectedWalkNearbyList nearbyList={selectedWalkData.nearbyList} />

        
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  handleIndicator: {
    width: 64,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#a8a8a8",
  },
});