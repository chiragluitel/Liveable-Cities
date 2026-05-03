/**
 * WalkPlannerSheetContent.tsx
 *
 * Pure React Native ScrollView — no Gorhom imports.
 * onWalkPress now returns the walk ID so the parent can open PlaceDetailSheet.
 */

import { ScrollView } from "react-native";
import { FITNESS_GOALS, MY_WALKS, NEARBY_AMENITIES } from "@/src/database/MockDB";
import { FourButton } from "../FourButton";
import { FitnessSection } from "../FitnessGoals/FitnessSection";
import MyWalksSection from "../MyWalks/MyWalksSection";
import { NearbySection } from "../Nearby/NearbySection";
import CommunityWalkSection from "../CommunityWalks/CommunityWalkSection";
import { useRouter } from "expo-router";

interface WalkPlannerSheetContentProps {
    onInteract: () => void;
    onWalkPress?: (walkId: string) => void;
    onAmenityPress?: () => void;
}

export const WalkPlannerSheetContent = ({
    onInteract,
    onWalkPress,
    onAmenityPress,
}: WalkPlannerSheetContentProps) => {
    const router = useRouter();

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 48, paddingTop: 4 }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={onInteract}
        >
            <MyWalksSection
                walks={MY_WALKS}
                onHeaderPress={() => {}}
                onWalkPress={(id) => {
                    onWalkPress?.(id);
                }}
            />
            <NearbySection
                amenities={NEARBY_AMENITIES}
                onAmenityPress={() => {
                    onAmenityPress?.();
                }}
            />
            <CommunityWalkSection
                walks={MY_WALKS}
                onHeaderPress={() => {}}
                onWalkPress={(id) => {
                    onWalkPress?.(id);
                }}
            />
            <FitnessSection goals={FITNESS_GOALS} />
            <FourButton
                button={[
                    { label: 'Share Location', onPress: () => console.log('Share My Location') },
                    { label: 'Report Problem', onPress: () => console.log('Report Problem') },
                    { label: 'Custom Walk',   onPress: () => router.push('/customWalkPage') },
                    { label: 'Privacy Policy', onPress: () => console.log('Privacy Policy') },
                ]}
            />
        </ScrollView>
    );
};