import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { FITNESS_GOALS, MY_WALKS, NEARBY_AMENITIES } from "@/src/database/MockDB";
import { FourButton } from "../FourButton";
import { FitnessSection } from "../FitnessGoals/FitnessSection";
import MyWalksSection from "../MyWalks/MyWalksSection";
import { NearbySection } from "../Nearby/NearbySection";
import CommunityWalkSection from "../CommunityWalks/CommunityWalkSection";

export const WalkPlannerSheetContent = () => {
    return (
        <BottomSheetScrollView 
            contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <MyWalksSection walks={MY_WALKS} onHeaderPress={() => {}} onWalkPress={() => {}} />
            <NearbySection amenities={NEARBY_AMENITIES} />
            <CommunityWalkSection walks={MY_WALKS} onHeaderPress={() => {}} onWalkPress={() => {}} />
            <FitnessSection goals={FITNESS_GOALS} />
            <FourButton 
                button={[
                    { label: 'Restaurants', onPress: () => console.log('Restaurants') },
                    { label: 'Petrol', onPress: () => console.log('Petrol') },
                    { label: 'Toilets', onPress: () => console.log('Toilets') },
                    { label: 'More', onPress: () => console.log('More') }
                ]}
            />
        </BottomSheetScrollView>
    );
};