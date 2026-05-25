import { Pressable, Text } from "react-native";

interface CustomButtonProps {
    label: string;
    onPress: () => void;
}

const CustomButton = ({ label, onPress }: CustomButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            className="h-12 px-8 rounded-full items-center justify-center bg-primary-500 dark:bg-dark-background-100 self-center active:opacity-90"
            accessibilityRole="button"
            accessibilityLabel={label}
        >
            <Text className="text-[17px] font-medium text-text-50 dark:text-dark-text-950 tracking-tight">
                {label}
            </Text>
        </Pressable>
    );
};

export default CustomButton;