import { Pressable, Text } from "react-native"

interface CustomButtonComponentProps {
    label: string;
    onClick: () => void;
}

const CustomButtonComponent = ({label, onClick}: CustomButtonComponentProps) => {
    return (
        <Pressable 
            className="bg-black rounded-full px-6 py-2 mt-2"
            onPress={onClick}
        >
            <Text className="text-white text-xs font-bold"> {label} </Text>    
        </Pressable>
    )
}
export default CustomButtonComponent;