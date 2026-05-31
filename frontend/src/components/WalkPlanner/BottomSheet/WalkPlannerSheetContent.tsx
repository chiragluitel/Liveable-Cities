import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { FITNESS_GOALS, MY_WALKS, NEARBY_AMENITIES } from "@/src/database/mockData";
import { GridButtons } from "../GridButtons";
import { FitnessSection } from "../FitnessGoals/FitnessSection";
import MyWalksSection from "../MyWalks/MyWalksSection";
import { NearbySection } from "../Nearby/NearbySection";
import CommunityWalkSection from "../CommunityWalks/CommunityWalkSection";
import CustomButton from "@Components/Shared/CustomButton";
import { useRouter } from "expo-router";

interface WalkPlannerSheetContentProps {
    onInteract: () => void;
    onWalkPress?: (walkId: string) => void;
    onCustomWalkPress?: () => void;
}

export const WalkPlannerSheetContent = ({ onInteract, onWalkPress, onCustomWalkPress }: WalkPlannerSheetContentProps) => {
    const router = useRouter();
    return (
        <BottomSheetScrollView
            contentContainerStyle={{ paddingBottom: 40, paddingTop: 4 }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={onInteract}
            onTouchStart={onInteract}
        >
            <MyWalksSection walks={MY_WALKS} onHeaderPress={() => {}} onWalkPress={onWalkPress ?? (() => router.navigate("/custom-walk-selected"))} />
            <View className="px-4 pb-4">
                <CustomButton label="Custom Walk" onPress={onCustomWalkPress ?? (() => router.push('/custom-walk' as any))} />
            </View>
            <NearbySection amenities={NEARBY_AMENITIES} onAmenityPress={onWalkPress ?? (() => router.navigate("/walk-selected"))} />
            <CommunityWalkSection walks={MY_WALKS} onHeaderPress={() => {}} onWalkPress={onWalkPress ?? (() => router.navigate("/custom-walk-selected"))} />
            <FitnessSection goals={FITNESS_GOALS} />
            <GridButtons
                button={[
                    { label: 'Share Location', onPress: () => console.log('Share My Location') },
                    { label: 'Report Problem', onPress: () => console.log('Report Problem') },
                    { label: 'Privacy Policy', onPress: () => console.log('Privacy Policy') }
                ]}
            />
        </BottomSheetScrollView>
    );
};
