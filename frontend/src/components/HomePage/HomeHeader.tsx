import {useEffect, useState} from "react"
import {View} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {GreetComponent} from "./GreetComponent"
// import WeatherComponent from "./Weather/WeatherDisplay";


const HomeHeader = () => {
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem("loggedIn")
        if (loggedIn === "true") {
          setUsername(await AsyncStorage.getItem("username"))
        }
      } catch (error) {
        console.error("Failed to load username:", error)
      }
    }
    loadUser()
  }, [])

  return(
    <View className="flex-row justify-between items-start mb-10 px-2 pt-8">
      <GreetComponent username = {username} />
        {/* <WeatherComponent /> */}
    </View>
  )
}

export default HomeHeader;
