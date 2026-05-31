import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { SelectedWalkData } from "@/src/types/walkDetailTypes";
import SelectedWalkTitleInfo from "./SelectedWalkTitleInfo";
import SelectedWalkActionRow from "./SelectedWalkActionRow";
import SelectedWalkInfoSection from "./SelectedWalkInfoSection";
import SelectedWalkNearbyList from "./SelectedWalkNearbyList";

type SelectedWalkContentProps = {
  walk: SelectedWalkData;
};

export default function SelectedWalkContent({ walk }: SelectedWalkContentProps) {
  return (
    <BottomSheetScrollView
      contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      <SelectedWalkTitleInfo
        title={walk.title}
        distanceText={walk.distanceText}
        durationText={walk.durationText}
      />
      <SelectedWalkActionRow />
      <SelectedWalkInfoSection
        title={walk.infoTitle}
        text={walk.infoText}
        selectedFilters={walk.selectedFilters}
      />
      <SelectedWalkNearbyList nearbyList={walk.nearbyList} />
    </BottomSheetScrollView>
  );
}
