import { Text, View } from "react-native"

interface AppIconLabelComponentProps {
    appName: string;
    appIcon: React.ReactNode
}

const AppIconLabelComponent = ({appName, appIcon}: AppIconLabelComponentProps) => {
    return (
        <View className="items-center gap-y-4">

            <View className="text-black">
                {appIcon}
            </View>
            
            <Text className="text-sm font-semibold text-black text-center mt-2"> 
                {appName} 
            </Text>
        </View>
    )   
}

export default AppIconLabelComponent;