import Dropdown from "@Components/Dropdown/Dropdown";
import DropdownItem from "@Components/Dropdown/DropdownItem";
import SettingsGroup from "@Components/Settings/SettingsGroup";
import SettingsSubPage from "@Components/Settings/SettingsSubPage";
import ToggleSetting from "@Components/Settings/ToggleSetting";
import { useRouter, Stack } from "expo-router";
import { ScrollView, View, Text } from "react-native";

export default function Settings() {
  const router = useRouter();

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
          <Dropdown title="Units" initialSelected="Metric">
            <DropdownItem title="Metric" value="Metric" />
            <DropdownItem title="Imperial" value="Imperial" hideSeperator={true} />
          </Dropdown>
          <Dropdown title="Walking Speed" initialSelected="Average" hideSeperator={true}>
            <DropdownItem title="Slow (2km/h)" value="Slow" />
            <DropdownItem title="Average (4km/h)" value="Average" />
            <DropdownItem title="Fast (6km/h)" value="Fast" hideSeperator={true} />
          </Dropdown>
        </SettingsGroup>

        <SettingsGroup title="Theme">
          <Dropdown title="Theme" initialSelected="Auto" hideSeperator={true}>
            <DropdownItem title="Auto" value="Auto" />
            <DropdownItem title="Light" value="Light" />
            <DropdownItem title="Dark" value="Dark" hideSeperator={true} />
          </Dropdown>
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
