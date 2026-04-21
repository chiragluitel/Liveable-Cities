import { colors } from "@Theme/colours";
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
            tabBarActiveTintColor: isLight ? colors.accent[400] : colors.dark.accent[500],
            tabBarInactiveTintColor: isLight ? colors.accent[200] : colors.dark.accent[200],
            tabBarActiveBackgroundColor: isLight ? colors.background[200] : colors.dark.background[200],
            tabBarInactiveBackgroundColor: isLight ? colors.background[50] : colors.dark.background[50],
            tabBarStyle: {
              borderTopWidth: 0,
            },
            sceneStyle: {
              backgroundColor: isLight ? colors.background[50] : colors.dark.background[50]
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