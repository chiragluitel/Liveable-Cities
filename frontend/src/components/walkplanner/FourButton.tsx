import { View } from "react-native";
import CustomButton from "../shared/CustomButton";
import { customButton } from "@/src/types/TypesForApp";

interface FourButtonProps {
    button: customButton[];
}

export const FourButton = ({ button }: FourButtonProps) => {
    return (
        <View className="flex-row flex-wrap justify-between px-4">
            {button.map((item, index) => (
                <View 
                    key={item.label} 
                    className="w-[48%] mb-4"
                >
                    <CustomButton 
                        onPress={item.onPress} 
                        label={item.label} 
                    />
                </View>
            ))}
        </View>
    );
};