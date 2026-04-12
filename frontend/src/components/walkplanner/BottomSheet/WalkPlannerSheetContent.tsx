import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { FITNESS_GOALS, MY_WALKS, NEARBY_AMENITIES } from "@/src/database/MockDB";
import { FourButton } from "../FourButton";
import { FitnessSection } from "../FitnessGoals/FitnessSection";
import MyWalksSection from "../MyWalks/MyWalksSection";
import { NearbySection } from "../Nearby/NearbySection";
import CommunityWalkSection from "../CommunityWalks/CommunityWalkSection";
import { useRouter } from "expo-router";

interface WalkPlannerSheetContentProps {
    onInteract: () => void;
}

export const WalkPlannerSheetContent = ({ onInteract }: WalkPlannerSheetContentProps) => {
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
            <MyWalksSection walks={MY_WALKS} onHeaderPress={() => {}} onWalkPress={() => router.navigate("/custom-walk-selected")} />
            <NearbySection amenities={NEARBY_AMENITIES} onAmenityPress={() => router.navigate("/walk-selected")} />
            <CommunityWalkSection walks={MY_WALKS} onHeaderPress={() => {}} onWalkPress={() => router.navigate("/custom-walk-selected")} />
            <FitnessSection goals={FITNESS_GOALS} />
            <FourButton 
                button={[
                    { label: 'Share Location', onPress: () => console.log('Share My Location') },
                    { label: 'Report Problem', onPress: () => console.log('Report Problem') },
                    { label: 'More Settings', onPress: () => console.log('More Settings') },
                    { label: 'Privacy Policy', onPress: () => console.log('Privacy Policy') }
                ]}
            />          
        </BottomSheetScrollView>
    );
};