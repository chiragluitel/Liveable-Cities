import { Text, View } from "react-native"
import AppIconLabelComponent from "./AppIconLabelComponent"
import CustomButtonComponent from "../Shared/CustomButtonComponent";

interface AnAppComponentProps {
    appName: string;
    appIcon: React.ReactNode;
    appDescription: string;
    buttonLabel: string;
    buttonOnClick: () => void;

}

const AnAppComponent = ({appName, appIcon, appDescription, buttonLabel, buttonOnClick}:AnAppComponentProps) => {
    return (
        <View className="bg-gray-100 rounded-[35px] p-6 items-center flex-1 mx-2 gap-y-3">    
        
            <AppIconLabelComponent appName={appName} appIcon={appIcon} />
            
            <Text className="text-gray-400 text-center text-xs leading-4 px-2">
                {appDescription}
            </Text>

            <CustomButtonComponent label={buttonLabel} onClick={buttonOnClick} />
        </View>
    )
}

export default AnAppComponent;