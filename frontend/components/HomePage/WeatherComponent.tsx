import { Text, View } from "react-native"

const WeatherComponent = () => {
    //This is just a mock-up, need to call API Later.
    return (
        <View className="bg-gray-50 border border-gray-100 rounded-2xl p-3 items-end gap-y-1"> 
            {/* Temp & Status Line */}
            <View className="flex-row items-center gap-x-1">
                <Text className="text-gray-400 font-medium text-lg"> ☀️ </Text>
                <Text className="text-gray-500 font-medium text-lg"> 17° </Text>
            </View>
            
            {/* AQI Indicator line */}
            <View className="flex-row items-center gap-x-1.5">
                <Text className="text-xs text-gray-400 font-medium"> AQI 48 </Text>
                <View className="w-2 h-2 bg-green-400 rounded-full" />
            </View>
        </View>
    )
}
export default WeatherComponent;