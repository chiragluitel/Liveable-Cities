import { Stack } from "expo-router";
import "../global.css"
import 'react-native-reanimated';

export default function RootLayout() {
  return (
      <Stack
        screenOptions={{
          headerShown: false, // 👈 THIS removes "index"
        }}
      />
    );
}
