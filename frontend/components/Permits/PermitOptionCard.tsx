import { router } from "expo-router";
import { Pressable, Text, View } from "react-native"

interface PermitOptionCardProps {
    optionName: string;
    optionIcon: React.ReactNode
    navigateTo: string;
}

const PermitOptionCard = ({optionName, optionIcon, navigateTo}: PermitOptionCardProps) => {
    return (
        <Pressable
        onPress={()=>router.push('/(apps)/permits/MyPermits')}
        >
            <View className="items-center justify-center bg-gray-100 p-6 rounded-2xl border border-gray-200 shadow-sm">    
                <View className="text-black">
                    {optionIcon}
                </View>
                <Text className="text-sm font-bold text-gray-800 text-center mt-3"> 
                    {optionName} 
                </Text>
            </View>
        </Pressable>
        
    )   
}

export default PermitOptionCard;