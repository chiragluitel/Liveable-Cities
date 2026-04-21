import { Text, View } from "react-native";

const WeatherComponent = () => {
  return (
    <View className="items-end">
      <Text className="text-sm text-text-600 dark:text-dark-text-700">☀️ 17°</Text>
      <Text className="text-xs text-text-600 dark:text-dark-text-700">Wed 4:58</Text>
    </View>
  )
}

export default WeatherComponent;