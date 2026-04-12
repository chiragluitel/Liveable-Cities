import { Walk } from "@/src/types/TypesForWalkPlanner";
import { useWindowDimensions, View } from "react-native";
import { HorizontalCarousel } from "@Components/shared/HorizontalCarousel";
import { MyWalkCard } from "../MyWalks/MyWalkCard";
import { ClickableHeader } from "@Components/shared/ClickableHeader";
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
    const GAP = 16;
    const SNAP_INTERVAL = CARD_WIDTH + GAP;

    return (
        <View className="mt-6 mb-4">
            <ClickableHeader header="Community Walks" onHeaderPress={onHeaderPress} />
            <HorizontalCarousel<Walk> data={walks} keyExtractor={(item) => item.id} snapToInterval={SNAP_INTERVAL} renderItem={({ item }) => (<CommunityWalkCard walk={item} onPress={onWalkPress} width={CARD_WIDTH} />)} rows={3}/>
        </View>
    )
}
export default CommunityWalkSection