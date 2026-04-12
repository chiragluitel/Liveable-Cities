import {View} from "react-native"
import {GreetComponent} from "./GreetComponent"
import WeatherComponent from "./WeatherComponent";


const HomeHeader = () => {
  return(
    <View className="flex-row justify-between items-start mb-10 px-2 py-8">
      <GreetComponent username = "Crystal" />
        <WeatherComponent />
    </View>
  )
}

export default HomeHeader;