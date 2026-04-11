import { Walk } from "@/src/types/TypesForWalkPlanner";
import { useWindowDimensions, View } from "react-native";
import { HorizontalCarousel } from "../HorizontalCarousel";
import { MyWalkCard } from "./MyWalkCard";
import { ClickableHeader } from "../ClickableHeader";

interface MyWalksSectionProps {
    walks: Walk[];
    onHeaderPress: () => void;
    onWalkPress: (walkId: string) => void;
}

const  MyWalksSection= ({walks, onHeaderPress, onWalkPress}: MyWalksSectionProps) => {
    if (!walks || walks.length ==0){
        return (
            <View> No Custom Walks! </View>
        )
    }
    const {width: windowWidth} = useWindowDimensions();
    const CARD_WIDTH = windowWidth * 0.85;
    const GAP = 16;
    const SNAP_INTERVAL = CARD_WIDTH + GAP;

    return (
        <View className="mt-6 mb-4">
            <ClickableHeader header="My Walks" onHeaderPress={onHeaderPress} />
            <HorizontalCarousel<Walk> data={walks} keyExtractor={(item) => item.id} snapToInterval={SNAP_INTERVAL} renderItem={({ item }) => (<MyWalkCard walk={item} onPress={onWalkPress} width={CARD_WIDTH} />)} rows={3}/>
        </View>
    )
}
export default MyWalksSection