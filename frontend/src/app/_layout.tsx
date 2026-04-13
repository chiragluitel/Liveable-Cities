import { Stack } from "expo-router";
import '@/global.css'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { WalkProvider } from '@/src/context/SavedCustomWalks';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <WalkProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />
          <Stack.Screen name="(apps)" options={{headerShown: false}} />
          <Stack.Screen name="CustomWalk" options={{headerShown: false}} />
        </Stack>
      </WalkProvider>
    </GestureHandlerRootView>
  )
}

