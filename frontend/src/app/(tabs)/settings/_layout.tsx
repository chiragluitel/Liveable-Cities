import { useSettings } from "@/src/context/SettingsContext";
import { colours } from "@Theme/colours";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function Layout() {
  const { colorScheme } = useColorScheme();

  const isLight = colorScheme === "light";

  const { reducedMotion } = useSettings();

  return <Stack screenOptions={{
    animation: reducedMotion ? "none" : "slide_from_right",
    contentStyle: {
      backgroundColor: isLight ? colours.background[50] : colours.dark.background[50]
    }
  }} />;
}