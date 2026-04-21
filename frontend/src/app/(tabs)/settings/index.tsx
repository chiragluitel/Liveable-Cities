import DropDown from "@Components/Dropdown/DropDown";
import DropDownItem from "@Components/Dropdown/DropDownItem";
import SettingsGroup from "@Components/settings/SettingsGroup";
import SettingsSubPage from "@Components/settings/SettingSubPage";
import ToggleSetting from "@Components/settings/ToggleSetting";
import { useRouter, Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { ScrollView, View, Text } from "react-native";

export default function Settings() {
  const router = useRouter();

  const { setColorScheme } = useColorScheme();

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
    <View className="flex-1 w-full">
      <ScrollView
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        <Stack.Screen options={{headerShown: false}} />

        <Text className="text-5xl pb-[5] font-bold w-full mt-[20%] ml-[10%]">
          Settings
        </Text>

        <SettingsGroup title="Measurements">
          <DropDown title="Units" initialSelected="Metric" actionFunc={(value: string) => {}}>
            <DropDownItem title="Metric" value="Metric" />
            <DropDownItem title="Imperial" value="Imperial" hideSeperator={true} />
          </DropDown>
          <DropDown title="Walking Speed" initialSelected="Average" hideSeperator={true} actionFunc={(value: string) => {}}>
            <DropDownItem title="Slow (2km/h)" value="Slow" />
            <DropDownItem title="Average (4km/h)" value="Average" />
            <DropDownItem title="Fast (6km/h)" value="Fast" hideSeperator={true} />
          </DropDown>
        </SettingsGroup>
        
        <SettingsGroup title="Theme">
          <DropDown title="Theme" initialSelected="Auto" hideSeperator={true} actionFunc={setTheme}>
            <DropDownItem title="Auto" value="Auto" />
            <DropDownItem title="Light" value="Light" />
            <DropDownItem title="Dark" value="Dark" hideSeperator={true} />
          </DropDown>
        </SettingsGroup>
        
        <SettingsGroup title="Night Detection">
          <ToggleSetting title="Auto Enable Street Lights" initialValue={true} hideSeperator={true} />
        </SettingsGroup>
        
        <SettingsGroup title="Accessibility">
          <ToggleSetting title="Reduce Motion" initialValue={false} />
          <ToggleSetting title="Increase Contrast" initialValue={false} hideSeperator={true} />
        </SettingsGroup>
        
        <SettingsGroup title="About">
          <SettingsSubPage title="Information" navigateFunc={() => router.navigate("/settings/information")} />
          <SettingsSubPage title="Other" navigateFunc={() => router.navigate("/settings/other")} hideSeperator={true} />
        </SettingsGroup>
      </ScrollView>
    </View>
  );
}