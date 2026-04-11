import { ChevronRight } from "lucide-react-native";
import { Pressable, Text } from "react-native";

interface ClickableHeaderProps {
    header: string;
    onHeaderPress: () => void;
}

export const ClickableHeader = ({header, onHeaderPress}: ClickableHeaderProps) => {
    return (
        <Pressable 
            onPress={onHeaderPress}
            className="flex-row items-center px-4 mb-3 active:opacity-60"
            accessibilityRole="header"
        >
            <Text className="text-xl font-bold text-gray-900 dark:text-white mr-1">
            {header}
            </Text>
            <ChevronRight size={20} color="#9CA3AF" />
        </Pressable>
    )
}