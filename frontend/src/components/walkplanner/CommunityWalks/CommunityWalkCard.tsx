import { Walk } from "@/src/types/TypesForWalkPlanner";
import { Footprints } from "lucide-react-native";
import { Dimensions, Pressable, View } from "react-native";
import { WalkDetails } from "../MyWalks/WalkDetails";
import { CommunityWalkDetails } from "./CommunityWalkDetails";

interface CommuntiyWalkCardProps {
    walk: Walk;
    onPress? : (walkId: string) => void
    width: number;
}

export const CommunityWalkCard = ({walk, onPress, width}: CommuntiyWalkCardProps) => {
    return (
        <Pressable
            onPress={() => onPress?.(walk.id)}
            className="flex-row bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 active:opacity-80"
            style={{width}}
            accessibilityRole="button"
            accessibilityLabel={`View details for ${walk.title}`}
        >
            <View
                className="w-14 h-14 rounded-xl items-center justify-center border-2"
                // style={{ backgroundColor: walk.thumbnailColor }}
            >
                <Footprints size={24} color="#000000" strokeWidth={2.5} />
            </View>

            <CommunityWalkDetails walk={walk} />
        </Pressable>

    )
}