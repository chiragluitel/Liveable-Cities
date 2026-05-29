import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { SelectedWalkData } from "../../types/walkDetailTypes";
import SelectedWalkContent from "./SelectedWalkContent";
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
      handleIndicatorStyle={{
        width: 64,
        height: 7,
        borderRadius: 999,
        backgroundColor: isLight ? colours.background[800] : colours.dark.background[800],
      }}
      backgroundStyle={{
        backgroundColor: isLight ? colours.background[50] : colours.dark.background[200],
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
      }}
    >
      <SelectedWalkContent walk={selectedWalkData} />
    </BottomSheet>
  );
}
