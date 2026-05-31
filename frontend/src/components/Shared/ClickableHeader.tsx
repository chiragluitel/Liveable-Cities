import { ChevronRight } from "lucide-react-native";
import { Pressable, Text } from "react-native";
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";

interface ClickableHeaderProps {
    header: string;
    onHeaderPress: () => void;
}

export const ClickableHeader = ({header, onHeaderPress}: ClickableHeaderProps) => {
    const { colorScheme } = useColorScheme();
    const isLight = colorScheme === "light";

    return (
        <Pressable 
            onPress={onHeaderPress}
            className="flex-row items-center px-4 mb-3 active:opacity-60"
            accessibilityRole="header"
        >
            <Text className="text-xl font-bold text-text dark:text-dark-text mr-1">
            {header}
            </Text>
            <ChevronRight size={20} color={isLight ? colours.text[400] : colours.dark.text[400]} />
        </Pressable>
    )
}