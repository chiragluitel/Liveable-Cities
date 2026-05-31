import { View } from "react-native";
import CustomButton from "@Components/Shared/CustomButton";
import { customButton } from "@/src/types/appTypes";

interface GridButtonsProps {
    button: customButton[];
}

export const GridButtons = ({ button }: GridButtonsProps) => {
    return (
        <View className="flex-row flex-wrap justify-between px-4 pt-4">
            {button.map((item, index) => {
                const isLastOdd = button.length % 2 !== 0 && index === button.length - 1;
                return (
                    <View key={item.label} className={`${isLastOdd ? 'w-full' : 'w-[48%]'} mb-3`}>
                        <CustomButton onPress={item.onPress} label={item.label} />
                    </View>
                );
            })}
        </View>
    );
};