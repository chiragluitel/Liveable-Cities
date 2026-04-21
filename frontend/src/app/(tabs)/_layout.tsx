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
            tabBarActiveTintColor: isLight ? colors.accent[700] : colors.dark.accent[400],
            tabBarInactiveTintColor: isLight ? colors.accent[400] : colors.dark.accent[200],
            tabBarActiveBackgroundColor: isLight ? colors.primary[200] : colors.dark.primary[100],
            tabBarInactiveBackgroundColor: isLight ? colors.primary[100] : colors.dark.primary[50],
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