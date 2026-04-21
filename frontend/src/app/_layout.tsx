import { Stack } from "expo-router";
import '@/global.css'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { WalkProvider } from '@/src/context/SavedCustomWalks';
import { colors } from "@Theme/colours";
import { useColorScheme } from "nativewind";
import useAsyncStorage from "@Hooks/useAsyncStorage";
import { useEffect } from "react";

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const isLight = colorScheme === "light";

  const [theme, setTheme, isThemeLoading] = useAsyncStorage("Theme", "Auto")

  useEffect(() => {
    if (isThemeLoading) {
      return;
    }

    switch (theme.toString()) {
      case "Light":
        setColorScheme("light");
        break;
      case "Dark":
        setColorScheme("dark");
        break;
      case "Auto":
      default:
        setColorScheme("system");
    }
  }, [theme, isThemeLoading]);

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <WalkProvider>
        <Stack
          screenOptions={
            {
              contentStyle: {
                backgroundColor: isLight
                  ? colors.background[50]
                  : colors.dark.background[50]
              }
            }
          }
        >
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />
          <Stack.Screen name="(apps)" options={{headerShown: false}} />
          <Stack.Screen name="CustomWalk" options={{headerShown: false}} />
        </Stack>
      </WalkProvider>
    </GestureHandlerRootView>
  )
}

