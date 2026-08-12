import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { View, Linking } from "react-native";
import { MY_WALKS } from "@/src/database/mockData";
import { GridButtons } from "../GridButtons";
import { FitnessSection } from "../FitnessGoals/FitnessSection";
import MyWalksSection from "../MyWalks/MyWalksSection";
import { NearbySection } from "../Nearby/NearbySection";
import CommunityWalkSection from "../CommunityWalks/CommunityWalkSection";
import CustomButton from "@Components/Shared/CustomButton";
import { useRouter } from "expo-router";
import { useCustomWalks } from "@/src/context/CustomWalkContext";
import { NearbyPressItem } from "@/src/components/WalkPlanner/Nearby/NearbySection";
import { FitnessGoal } from "@/src/types/walkPlannerTypes";
import { useSettings } from "@/src/context/SettingsContext";

interface WalkPlannerSheetContentProps {
    onInteract: () => void;
    onWalkPress?: (walkId: string) => void;
    onCustomWalkCardPress?: (walk: any) => void;
    onNearbyPress?: (item: NearbyPressItem) => void;
}

export const WalkPlannerSheetContent = ({ onInteract, onWalkPress, onCustomWalkCardPress, onNearbyPress }: WalkPlannerSheetContentProps) => {
    const router = useRouter();
    const { walks } = useCustomWalks();

    const { walkGoal, weeklyWalks } = useSettings();

    const fitnessGoals: FitnessGoal[] = [
        {
            id: 'g1',
            label: 'Weekly Walks',
            unit: 'walks',
            current: Number(weeklyWalks),
            target: Number(walkGoal)
        },
    ]

    return (
        <BottomSheetScrollView
            contentContainerStyle={{ paddingBottom: 40, paddingTop: 4 }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={onInteract}
            onTouchStart={onInteract}
        >
            <MyWalksSection walks={walks} onWalkPress={onCustomWalkCardPress ?? (() => {})} />
            <View className="px-4 pb-4">
                <CustomButton label="Create a Custom Walk" onPress={() => router.push('/custom-walk' as any)} />
            </View>
            <NearbySection onNearbyPress={onNearbyPress} />
            <CommunityWalkSection walks={MY_WALKS} onHeaderPress={() => {}} onWalkPress={onWalkPress ?? (() => router.navigate("/custom-walk-selected"))} />
            <GridButtons
                button={[
                    { label: 'Report Problem', onPress: () => Linking.openURL('https://github.com/chiragluitel/Liveable-Cities/issues') }
                ]}
            />
        </BottomSheetScrollView>
    );
};
