import { colors } from "@Theme/colours";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function Layout() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const isLight = colorScheme === "light";

  return <Stack screenOptions={{
    animation: "slide_from_right",
    contentStyle: {
      backgroundColor: isLight ? colors.background[50] : colors.dark.background[50]
    }
  }} />;
}