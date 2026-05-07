// this file contains the functionality for getting the weather icon according to the different weather codes according to open meteo

import {
    Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
} from "lucide-react-native";

export function getWeatherIcon(code: number) {
    switch (code) {
      // clear sky
      case 0:
        return <Sun size={50} color="white" />;

      //mainly clear/partly cloudy/overcast
      case 1:
      case 2:
      case 3:
        return <Cloud size={50} color="white" />;

      // fog
      case 45:
      case 48:
        return <CloudFog size={50} color="white" />;

      // drizzle
      case 51:
      case 53:
      case 55:
        return <CloudDrizzle size={50} color="white" />;

      // rainy
      case 61:
      case 63:
      case 65:
        return <CloudRain size={50} color="white" />;

      // snowing
      case 71:
      case 73:
      case 75:
      case 77:
        return <CloudSnow size={50} color="white" />;

      // thunderstorm
      case 95:
      case 96:
      case 99:
        return <CloudLightning size={50} color="white" />;

      default:
        return <Cloud size={50} color="white" />;
    }
}