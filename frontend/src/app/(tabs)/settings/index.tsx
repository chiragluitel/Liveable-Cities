import Dropdown from "@Components/Dropdown/Dropdown";
import DropdownItem from "@Components/Dropdown/DropdownItem";
import SettingsGroup from "@Components/Settings/SettingsGroup";
import SettingsSubPage from "@Components/Settings/SettingsSubPage";
import ToggleSetting from "@Components/Settings/ToggleSetting";
import { useRouter, Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { useSettings } from "@/src/context/SettingsContext";
import { ScrollView, View, Text } from "react-native";

import useAsyncStorage from "@Hooks/useAsyncStorage";

export default function Settings() {
  const router = useRouter();

  const { setColorScheme } = useColorScheme();
  const { 
    reducedMotion, setReducedMotion,
  } = useSettings();

  function setTheme(value: string) {
    switch (value) {
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
  }

  return (
    <View className="flex-1 w-full bg-background-50 dark:bg-dark-background-50">
      <ScrollView
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        <Stack.Screen options={{headerShown: false}} />

        <Text className="text-5xl pb-[5] font-bold w-full mt-[20%] ml-[10%] text-text dark:text-dark-text">
          Settings
        </Text>

        <SettingsGroup title="Theme">
          <Dropdown title="Theme" valueKey="theme" initialSelected="Auto" hideSeperator={true} actionFunc={setTheme}>
            <DropdownItem title="Auto" value="Auto" />
            <DropdownItem title="Light" value="Light" />
            <DropdownItem title="Dark" value="Dark" hideSeperator={true} />
          </Dropdown>
        </SettingsGroup>

        <SettingsGroup title="Accessibility">
          <ToggleSetting title="Reduce Motion" valueKey="reduceMotion" value={reducedMotion} setValue={setReducedMotion} hideSeperator={true} />
        </SettingsGroup>

        <SettingsGroup title="About">
          <SettingsSubPage title="Information" navigateFunc={() => router.navigate("/settings/information")} />
          <SettingsSubPage title="Other" navigateFunc={() => router.navigate("/settings/other")} hideSeperator={true} />
        </SettingsGroup>
      </ScrollView>
    </View>
  );
}
