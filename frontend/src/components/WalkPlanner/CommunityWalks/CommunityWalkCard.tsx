import { Walk } from "@/src/types/walkPlannerTypes";
import { Footprints } from "lucide-react-native";
import { Dimensions, Pressable, View } from "react-native";
import { WalkDetails } from "../MyWalks/WalkDetails";
import { CommunityWalkDetails } from "./CommunityWalkDetails";
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";

interface CommuntiyWalkCardProps {
    walk: Walk;
    onPress? : (walkId: string) => void
    width: number;
}

export const CommunityWalkCard = ({walk, onPress, width}: CommuntiyWalkCardProps) => {
    const { colorScheme } = useColorScheme();
    const isLight = colorScheme === "light";

    return (
        <Pressable
            onPress={() => onPress?.(walk.id)}
            className="flex-row bg-background-100 dark:bg-dark-background-200 rounded-2xl p-4 shadow-sm border border-text-100 dark:border-dark-text-50 active:opacity-80"
            style={{width}}
            accessibilityRole="button"
            accessibilityLabel={`View details for ${walk.title}`}
        >
            <View
                className="w-14 h-14 rounded-xl items-center justify-center border-2 border-text dark:border-dark-text-800"
                // style={{ backgroundColor: walk.thumbnailColor }}
            >
                <Footprints size={24} color={isLight ? colours.text.DEFAULT : colours.dark.text[800]} strokeWidth={2.5} />
            </View>

            <CommunityWalkDetails walk={walk} />
        </Pressable>

    )
}