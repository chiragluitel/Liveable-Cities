import { Pressable, Text } from "react-native";

interface CustomButtonProps {
    label: string;
    onPress: () => void;
}

const CustomButton = ({label, onPress}: CustomButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            className=""
        >
            <Text className=""> {label} </Text>
        </Pressable>
    )

}

export default CustomButton;