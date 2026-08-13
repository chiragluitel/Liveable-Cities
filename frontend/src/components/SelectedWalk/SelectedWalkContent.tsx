import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { SelectedWalkData } from "@/src/types/walkDetailTypes";
import SelectedWalkTitleInfo from "./SelectedWalkTitleInfo";
import SelectedWalkActionRow from "./SelectedWalkActionRow";

type SelectedWalkContentProps = {
  walk: SelectedWalkData;
  onEdit?: () => void;
  onDelete?: () => void;
  onImport?: () => void;
};

export default function SelectedWalkContent({ walk, onEdit, onDelete, onImport }: SelectedWalkContentProps) {
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
      <SelectedWalkActionRow onEdit={onEdit} onDelete={onDelete} onImport={onImport} />
    </BottomSheetScrollView>
  );
}
