import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#0091ff",
          tabBarInactiveTintColor: "#777777",
          tabBarActiveBackgroundColor: "white",
          tabBarInactiveBackgroundColor: "white",
          animation: "shift"
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({color}) => <Ionicons size={28} name="home" color={color} />
          }}
        />
        <Tabs.Screen
          name="profilePage"
          options={{
            title: "Profile",
            tabBarIcon: ({color}) => <Ionicons size={28} name="person" color={color} />
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({color}) => <Ionicons size={28} name="settings" color={color} />
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}