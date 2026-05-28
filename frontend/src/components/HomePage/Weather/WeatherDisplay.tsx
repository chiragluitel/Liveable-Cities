// this file contains the UI control for weather(just skeleton)

import {View, Text} from "react-native";
import {getWeatherIcon} from "./GetWeatherIcon";

interface Props {
  suburb: string;
  temp: number;
  weatherCode: number;
}

export default function WeatherDisplay({
  suburb,
  temp,
  weatherCode,

}: Props) {

  return(
    <View className="bg-primary-400 dark:bg-primary-800 rounded-xl px-5 py-2 mt-4 flex-row items-center justify-between">

      <View>
        <Text className="text-dark-text dark:text-dark-text text-xl font-semibold">
          {suburb}
        </Text>

        <Text className="text-dark-text dark:text-dark-text text-md font-semibold">
          {temp}°C
        </Text>

      </View>

      <Text className="text-dark-text dark:text-dark-text text-3xl font-bold mt-1">
        {getWeatherIcon(weatherCode)}
      </Text>

    </View>
  )
}