import { Pressable, Text } from "react-native";

interface CustomButtonProps {
    label: string;
    onPress: () => void;
}

const CustomButton = ({ label, onPress }: CustomButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            className="h-12 px-8 rounded-full items-center justify-center bg-secondary-200 dark:bg-dark-secondary self-stretch active:opacity-90"
            accessibilityRole="button"
            accessibilityLabel={label}
        >
            <Text className="text-[17px] font-medium text-text dark:text-dark-text tracking-tight">
                {label}
            </Text>
        </Pressable>
    );
};

export default CustomButton;