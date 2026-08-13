import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import type { SharedValue } from "react-native-reanimated";
import { SelectedWalkData } from "../../types/walkDetailTypes";
import SelectedWalkContent from "./SelectedWalkContent";
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";


type SelectedWalkSheetProps = {
  sheetRef: React.RefObject<BottomSheet | null>;
  snapPoints: string[];
  selectedWalkData: SelectedWalkData;
  animatedPosition?: SharedValue<number>;
};

export default function SelectedWalkSheet({
  sheetRef,
  snapPoints,
  selectedWalkData,
  animatedPosition,
}: SelectedWalkSheetProps) {
	const { colorScheme } = useColorScheme();
	const isLight = colorScheme === "light";

  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      animatedPosition={animatedPosition}
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
