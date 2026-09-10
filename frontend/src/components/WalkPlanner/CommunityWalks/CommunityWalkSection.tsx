import { Walk } from "@/src/types/walkPlannerTypes";
import { useWindowDimensions, View } from "react-native";
import { HorizontalCarousel } from "@Components/Shared/HorizontalCarousel";
import { MyWalkCard } from "../MyWalks/MyWalkCard";
import { ClickableHeader } from "@Components/Shared/ClickableHeader";
import { CommunityWalkCard } from "./CommunityWalkCard";

interface CommunityWalkSectionProps {
    walks: Walk[];
    onHeaderPress: () => void;
    onWalkPress: (walkId: string) => void;
}

const  CommunityWalkSection = ({walks, onHeaderPress, onWalkPress}: CommunityWalkSectionProps) => {
    if (!walks || walks.length ==0){
        return (
            <View> No Community Walks! </View>
        )
    }
    const {width: windowWidth} = useWindowDimensions();
    const CARD_WIDTH = windowWidth * 0.85;
    const STACKED_CARD_WIDTH = windowWidth - 32;
    const GAP = 16;
    const SNAP_INTERVAL = CARD_WIDTH + GAP;

    return (
        <View className="mt-6 mb-4">
            <ClickableHeader header="Community Walks" onHeaderPress={onHeaderPress} />
            {walks.length <= 3 ? (
                // Few enough to fit without scrolling, so stack full-width instead of a carousel.
                <View className="px-4 gap-3">
                    {walks.map((walk) => (
                        <CommunityWalkCard key={walk.id} walk={walk} onPress={onWalkPress} width={STACKED_CARD_WIDTH} />
                    ))}
                </View>
            ) : (
                <HorizontalCarousel<Walk>
                    data={walks}
                    keyExtractor={(item) => item.id}
                    snapToInterval={SNAP_INTERVAL}
                    renderItem={({ item }) => (
                        <CommunityWalkCard walk={item} onPress={onWalkPress} width={CARD_WIDTH} />
                    )}
                    rows={3}
                />
            )}
        </View>
    )
}
export default CommunityWalkSection