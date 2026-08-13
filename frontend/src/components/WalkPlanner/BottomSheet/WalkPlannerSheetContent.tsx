import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { View, Linking } from "react-native";
import { GridButtons } from "../GridButtons";
import { FitnessSection } from "../FitnessGoals/FitnessSection";
import MyWalksSection from "../MyWalks/MyWalksSection";
import { NearbySection } from "../Nearby/NearbySection";
import CommunityWalkSection from "../CommunityWalks/CommunityWalkSection";
import CustomButton from "@Components/Shared/CustomButton";
import { useRouter } from "expo-router";
import { useCustomWalks } from "@/src/context/CustomWalkContext";
import { useCommunityWalks } from "@/src/context/CommunityWalksContext";
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
    const { communityWalks } = useCommunityWalks();

    const { distGoal, stepGoal } = useSettings();

    const fitnessGoals: FitnessGoal[] = [
        {
            id: 'g1',
            label: 'Weekly Distance',
            unit: 'km',
            current: 0,
            target: Number(distGoal)
        },
        {
            id: 'g2',
            label: 'Daily Steps',
            unit: 'steps',
            current: 0,
            target: Number(stepGoal)
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
            <CommunityWalkSection walks={communityWalks} onHeaderPress={() => {}} onWalkPress={onWalkPress ?? (() => router.navigate("/custom-walk-selected"))} />
            <FitnessSection goals={fitnessGoals} />
            <GridButtons
                button={[
                    { label: 'Report Problem', onPress: () => Linking.openURL('https://github.com/chiragluitel/Liveable-Cities/issues') }
                ]}
            />
        </BottomSheetScrollView>
    );
};
