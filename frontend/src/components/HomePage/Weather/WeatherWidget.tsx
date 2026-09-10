// this file connects the functionality and UI to show the correct weather and suburb

import {View, Text, ActivityIndicator} from "react-native";

import WeatherDisplay from "./WeatherDisplay";
import { useWeather } from "./WeatherFunctionality";
import { useSettings } from "@/src/context/SettingsContext";

export default function WeatherWidget(){
    const {weather, loading} = useWeather();

    const { reducedMotion } = useSettings()

    if (loading) {
        return (
            <View className="bg-primary-400 dark:bg-primary-800 p-5 rounded-2xl mt-5 mb-8 w-[90%]">
                {/* loading spinner animation */}
                {
                    reducedMotion 
                    ? <Text className="text-text-900 dark:text-text-50 text-center">Loading...</Text>
                    : <ActivityIndicator color="white" />
                }
            </View>
        );
    }

    if (!weather) {
        return (
            <>
                {/*
                    <View className="bg-primary-400 dark:bg-primary-800 p-5 rounded-2xl mt-5">
                        <Text className="text-text-50 dark:text-dark-text">
                            Unable to load weather!
                        </Text>
                    </View>
                */}
            </>
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