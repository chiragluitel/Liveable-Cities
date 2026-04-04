import { Text, TouchableOpacity, View } from "react-native"
import  {Ionicons} from '@expo/vector-icons'

interface AppCardComponentProps {
    buttonLabel: string;
    onClick : () => void;
    iconName : keyof typeof Ionicons.glyphMap;
}

const AppCardComponent = ({iconName, onClick, buttonLabel}: AppCardComponentProps) => {
    return (
        <View>
            <Ionicons name={iconName} size={48} color = "#1e293b"/>
            <TouchableOpacity onPress={onClick} className="">
                <Text> {buttonLabel} </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AppCardComponent;