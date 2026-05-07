import { colours } from "@Theme/colours";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  const isLight = colorScheme === "light";

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Tabs
      key={colorScheme}
        screenOptions={
          {
            headerShown: false,
            animation: "shift",
            tabBarActiveTintColor: isLight ? colours.accent[700] : colours.dark.accent[400],
            tabBarInactiveTintColor: isLight ? colours.accent[400] : colours.dark.accent[200],
            tabBarActiveBackgroundColor: isLight ? colours.primary[200] : colours.dark.primary[100],
            tabBarInactiveBackgroundColor: isLight ? colours.primary[100] : colours.dark.primary[50],
            tabBarStyle: {
              borderTopWidth: 0,
            },
            sceneStyle: {
              backgroundColor: isLight ? colours.background[50] : colours.dark.background[50]
            }
          }
        }
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