import { Stack } from "expo-router";
import '@/global.css'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex:1}}> 
      <Stack>
        <Stack.Screen name="(apps)" options={{headerShown: false}} /> 
      </Stack>
    </GestureHandlerRootView>
  )
}
