import { Stack } from "expo-router";
import '../global.css'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(apps)" options={{headerShown: false}} /> 
    </Stack>
  )
}
