import AnAppComponent from "@/components/HomePage/AnAppComponent";
import AppCardComponent from "@/components/HomePage/AppIconLabelComponent"
import { GreetComponent } from "@/components/HomePage/GreetComponent"
import HomeHeader from "@/components/HomePage/HomeHeader";
import { Bell, Map, MapPin } from "lucide-react-native";
import { ScrollView, View } from "react-native"

export default function HomePage() {
    const handleClick = (appName: string)=>{
        console.log(`${appName} Clicked`);
    }
    return (
        <ScrollView className="flex-1 bg-white safe-area-pt tab-bar-pb px-4">
            <HomeHeader />
            <View className="flex-row flex-wrap justify-between gap-y-4">
            
                {/* 1. Walk Planner Card */}
                <AnAppComponent
                    appIcon={<MapPin size={60} strokeWidth={1.5} color="black" />}
                    appName="Smart Walk Planner"
                    appDescription="Plan your walks tailored to your needs"
                    buttonLabel="Plan >"
                    buttonOnClick={() => handleClick("Walk Planner")}
                />

                {/* 2. Notification Card */}
                <AnAppComponent
                    appIcon={<Bell size={60} strokeWidth={1.5} color="black" />}
                    appName="Notification Service"
                    appDescription="Get notified about important stuff."
                    buttonLabel="View >"
                    buttonOnClick={() => handleClick("Notifications")}
                />
            </View>
        </ScrollView>
    )
}

