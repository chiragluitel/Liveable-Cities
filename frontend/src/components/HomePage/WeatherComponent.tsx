import { Text, View } from "react-native";

const WeatherComponent = () => {
  return (
    <View className="items-end">
      <Text className="text-sm">☀️ 17°</Text>
      <Text className="text-xs text-gray-400">Wed 4:58</Text>
    </View>
  )
}

export default WeatherComponent;