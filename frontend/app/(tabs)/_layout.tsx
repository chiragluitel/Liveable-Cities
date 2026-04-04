import { CustomNavbar } from "@/components/Navbar/CustomNavbar";
import { Tabs } from "expo-router"
import { Bell, Home, HomeIcon, MenuIcon, User } from "lucide-react-native";

const TabLayout = () => {
    return(
        <Tabs tabBar={(props) => <CustomNavbar {...props} /> } screenOptions={{headerShown: false}}> 
            <Tabs.Screen name="index" options={{
                title:'Home',
                tabBarIcon: ({color, size}) => <Home color={color} size={size} />
            }} />
            <Tabs.Screen name="Notifications" options={{
                title:'Notifications',
                tabBarIcon: ({color, size}) => <Bell color={color} size={size} />
            }} />
            <Tabs.Screen name="Menu" options={{
                title:'Menu',
                tabBarIcon: ({color, size}) => <MenuIcon color={color} size={size} />
            }} />
            <Tabs.Screen name="Profile" options={{
                title:'Profile',
                tabBarIcon: ({color, size}) => <User color={color} size={size} />
            }} />

        </Tabs>
    )
}

export default TabLayout;