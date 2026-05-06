// this file contains functionality logic for weather component

import {useEffect, useState} from "react";
import * as Location from "expo-location";

import {getLocation} from "@/src/components/map/config/useMapLocation";

export interface WeatherData {
    temp: number;
    weatherCode: number;
    suburb: string;
}

export function useWeather(){
    const [weather, setWeather] = 
        useState<WeatherData | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getWeather();
    }, []);

    const getWeather = async () => {
        try {
            const location = await getLocation();

            if (!location) {
                return;
            }

            const lat = location.lat;
            const long = location.lng;

            const reverseGeocode = 
                await Location.reverseGeocodeAsync({
                    latitude: lat,
                    longitude: long,
                })

            const suburb = 
                reverseGeocode[0]?.district ||
                reverseGeocode[0]?.subregion ||
                reverseGeocode[0]?.city ||
                "Melbourne";

            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,weather_code&timezone=auto`
            );

            const data =await response.json();

            setWeather({
                temp: Math.round(
                    data.current.temperature_2m
                ),
                weatherCode: data.current.weather_code,
                suburb,
            });
        } catch (error) {
            console.log(error);
        }

        finally{
            setLoading(false);
        }
    };

    return{
        weather,
        loading,
    };
}