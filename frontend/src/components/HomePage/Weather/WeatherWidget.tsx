// this file connects the functionality and UI to show the correct weather and suburb

import {View, Text, ActivityIndicator} from "react-native";

import WeatherDisplay from "./WeatherDisplay";
import { useWeather } from "./WeatherFunctionality";

export default function WeatherWidget(){
    const {weather, loading} = useWeather();

    if (loading) {
        return (
            <View className="bg-green-900 p-5 rounded-2xl mt-5">
                {/* loading spinner animation */}
                <ActivityIndicator color="white" />
            </View>
        );
    }

    if (!weather) {
        return (
            <View className="bg-green-900 p-5 rounded-2xl mt-5">
                <Text className="text-white">
                    Unable to load weather!
                </Text>
            </View>
        );
    }

    return (
        <WeatherDisplay
            suburb={weather.suburb}
            temp= {weather.temp}
            weatherCode={weather.weatherCode}
        />
    );
}