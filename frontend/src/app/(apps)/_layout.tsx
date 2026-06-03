import { useSettings } from "@/src/context/SettingsContext";
import { Stack } from "expo-router"

const AppLayout = () => {
  const { reducedMotion } = useSettings();

  return (   
    <Stack screenOptions={{
      headerShown: false,
      animation: reducedMotion ? "none" : "default"
    }}/> 
  )
}

export default AppLayout;