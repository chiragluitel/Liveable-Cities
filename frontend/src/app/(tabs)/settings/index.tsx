import Dropdown from "@Components/Dropdown/Dropdown";
import DropdownItem from "@Components/Dropdown/DropdownItem";
import SettingsGroup from "@Components/Settings/SettingsGroup";
import SettingsSubPage from "@Components/Settings/SettingsSubPage";
import ToggleSetting from "@Components/Settings/ToggleSetting";
import { useRouter, Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { useSettings, WalkingSpeed } from "@/src/context/SettingsContext";
import { ScrollView, View, Text } from "react-native";

export default function Settings() {
  const router = useRouter();

  const { setColorScheme } = useColorScheme();
  const { walkingSpeed, setWalkingSpeed } = useSettings();

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

        <SettingsGroup title="Measurements">
          <Dropdown title="Units" initialSelected="Metric" actionFunc={(value: string) => {}}>
            <DropdownItem title="Metric" value="Metric" />
            <DropdownItem title="Imperial" value="Imperial" hideSeperator={true} />
          </Dropdown>
          <Dropdown title="Walking Speed" initialSelected={walkingSpeed} hideSeperator={true} actionFunc={(value: string) => setWalkingSpeed(value as WalkingSpeed)}>
            <DropdownItem title="Slow (2km/h)" value="Slow" />
            <DropdownItem title="Average (4km/h)" value="Average" />
            <DropdownItem title="Fast (6km/h)" value="Fast" hideSeperator={true} />
          </Dropdown>
        </SettingsGroup>

        <SettingsGroup title="Theme">
          <Dropdown title="Theme" initialSelected="Auto" hideSeperator={true} actionFunc={setTheme}>
            <DropdownItem title="Auto" value="Auto" />
            <DropdownItem title="Light" value="Light" />
            <DropdownItem title="Dark" value="Dark" hideSeperator={true} />
          </Dropdown>
        </SettingsGroup>

        <SettingsGroup title="Night Detection">
          <ToggleSetting title="Auto Enable Street Lights" initialValue={true} hideSeperator={true} actionFunc={(value: boolean) => {}} />
        </SettingsGroup>

        <SettingsGroup title="Accessibility">
          <ToggleSetting title="Reduce Motion" initialValue={false} actionFunc={(value: boolean) => {}} />
          <ToggleSetting title="Increase Contrast" initialValue={false} hideSeperator={true} actionFunc={(value: boolean) => {}} />
        </SettingsGroup>

        <SettingsGroup title="About">
          <SettingsSubPage title="Information" navigateFunc={() => router.navigate("/settings/information")} />
          <SettingsSubPage title="Other" navigateFunc={() => router.navigate("/settings/other")} hideSeperator={true} />
        </SettingsGroup>
      </ScrollView>
    </View>
  );
}
