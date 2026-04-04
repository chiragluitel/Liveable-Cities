import AppCardComponent from "@/components/HomePage/AppCardComponent"
import { GreetComponent } from "@/components/HomePage/GreetComponent"
import { View } from "react-native"

export default function HomePage() {
    const handleClick = ()=>{
        console.log('Clicked!');
    }
    return (
        <View>
            <GreetComponent username="Chirag" />
            <AppCardComponent buttonLabel="Plan" iconName="map-outline" onClick={()=>handleClick()} />
        </View>
    )
}

