import { View } from "react-native"
import { GreetComponent } from "./GreetComponent"
import WeatherComponent from "./WeatherComponent"

const HomeHeader = () => {

    //Just a prop, need to use authcontext later
    return (
        <View className="flex-row justify-between items-start mb-10 px-2">
            <GreetComponent username="Chirag" />
            <WeatherComponent />
        </View>
    )
}

export default HomeHeader;