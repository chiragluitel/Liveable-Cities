import { View, Text, Pressable } from "react-native";
import { MapPin } from "lucide-react-native";
import { Places } from "@/src/types/TypesForWalkPlanner";
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";

interface PlaceResultCardProps {
    place: Places;
    onPress: (place: Places) => void;
    isLast: boolean;
}

export const PlaceResultCard = ({ place, onPress, isLast }: PlaceResultCardProps) => {
    const { colorScheme } = useColorScheme();
    
    const isLight = colorScheme === "light";

    const formattedAddress = `${place.streetAddress}, ${place.suburb} ${place.state}`;

    return (
        <Pressable
            onPress={() => onPress(place)}
            className="flex-row items-center pl-4 pr-4 py-2 active:bg-background-100 dark:active:bg-dark-accent-200"
        >
            <View className="bg-primary-100 dark:bg-dark-primary-300 rounded-full p-2.5 mr-4 mt-1">
                <MapPin size={22} color={isLight ? colours.accent[300] : colours.dark.accent[600]} />
            </View>
            <View className={`flex-1 pb-3 pt-2 ${!isLast ? 'border-b border-text-200 dark:border-dark-text-300' : ''}`}>
                <Text className="text-[17px] font-semibold text-text dark:text-dark-text mb-0.5">
                    {place.title}
                </Text>
                <Text className="text-[14px] text-text-500 dark:text-dark-text-600" numberOfLines={1}>
                    {formattedAddress}
                </Text>
            </View>
        </Pressable>
    );
};