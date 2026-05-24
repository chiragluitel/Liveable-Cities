import { Stack } from "expo-router";
import '@/global.css'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CustomWalkProvider } from '@/src/context/CustomWalkContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <CustomWalkProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />
          <Stack.Screen name="(apps)" options={{headerShown: false}} />
          <Stack.Screen name="CustomWalk" options={{headerShown: false}} />
        </Stack>
      </CustomWalkProvider>
    </GestureHandlerRootView>
  )
}

