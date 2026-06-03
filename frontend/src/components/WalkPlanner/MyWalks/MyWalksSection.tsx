import { useWindowDimensions, View, Text } from "react-native";
import { HorizontalCarousel } from "@Components/Shared/HorizontalCarousel";
import { CustomMyWalkCard } from "./CustomMyWalkCard";

interface MyWalksSectionProps {
    walks: any[];
    onWalkPress: (walk: any) => void;
}

const MyWalksSection = ({ walks, onWalkPress }: MyWalksSectionProps) => {
    const { width: windowWidth } = useWindowDimensions();
    const CARD_WIDTH = windowWidth * 0.85;
    const STACKED_CARD_WIDTH = windowWidth - 32;
    const GAP = 16;
    const SNAP_INTERVAL = CARD_WIDTH + GAP;

    if (!walks || walks.length === 0) {
        return (
            <View className="px-4 mt-6 mb-4">
                <Text className="text-xl font-bold text-text dark:text-dark-text mb-3">My Walks</Text>
                <Text className="text-[15px] text-text-600 dark:text-dark-text-400 text-center py-6">No custom walks created.</Text>
            </View>
        );
    }

    return (
        <View className="mt-6 mb-4">
            <Text className="text-xl font-bold text-text dark:text-dark-text px-4 mb-3">My Walks</Text>
            {walks.length <= 3 ? (
                <View className="px-4 gap-3">
                    {walks.map((walk) => (
                        <CustomMyWalkCard key={walk.id} walk={walk} onPress={onWalkPress} width={STACKED_CARD_WIDTH} />
                    ))}
                </View>
            ) : (
                <HorizontalCarousel<any>
                    data={walks}
                    keyExtractor={(item) => item.id}
                    snapToInterval={SNAP_INTERVAL}
                    renderItem={({ item }) => (
                        <CustomMyWalkCard walk={item} onPress={onWalkPress} width={CARD_WIDTH} />
                    )}
                    rows={3}
                />
            )}
        </View>
    );
};

export default MyWalksSection;
