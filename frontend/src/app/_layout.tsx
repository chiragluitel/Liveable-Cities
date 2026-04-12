import { Stack } from "expo-router";
import { WalkProvider } from "../context/SavedCustomWalks";

export default function RootLayout() {
  return (
    <WalkProvider>
      <Stack />
    </WalkProvider>
  );
}

