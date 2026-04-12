import { View, Text, Pressable } from "react-native";
import { MapPin } from "lucide-react-native";
import { Places } from "@/src/types/TypesForWalkPlanner";


interface PlaceResultCardProps {
    place: Places;
    onPress: (place: Places) => void;
    isLast: boolean;
}

export const PlaceResultCard = ({ place, onPress, isLast }: PlaceResultCardProps) => {
    const formattedAddress = `${place.streetAddress}, ${place.suburb} ${place.state}`;

    return (
        <Pressable
            onPress={() => onPress(place)}
            className="flex-row items-center pl-4 pr-4 py-2 active:bg-gray-100 dark:active:bg-gray-800"
        >
            <View className="bg-gray-200 dark:bg-gray-700 rounded-full p-2.5 mr-4 mt-1">
                <MapPin size={22} color="#4B5563" />
            </View>
            <View className={`flex-1 pb-3 pt-2 ${!isLast ? 'border-b border-gray-200 dark:border-gray-800' : ''}`}>
                <Text className="text-[17px] font-semibold text-gray-900 dark:text-white mb-0.5">
                    {place.title}
                </Text>
                <Text className="text-[14px] text-gray-500 dark:text-gray-400" numberOfLines={1}>
                    {formattedAddress}
                </Text>
            </View>
        </Pressable>
    );
};