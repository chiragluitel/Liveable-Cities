import DropDown from "@Components/Dropdown/DropDown";
import DropDownItem from "@Components/Dropdown/DropDownItem";
import SettingsGroup from "@Components/settings/SettingsGroup";
import SettingsSubPage from "@Components/settings/SettingSubPage";
import ToggleSetting from "@Components/settings/ToggleSetting";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View, Text } from "react-native";

export default function Settings() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        <Text style={styles.title} >
          Settings
        </Text>

        <SettingsGroup title="Measurements">
          <DropDown title="Units" initialSelected="Metric">
            <DropDownItem title="Metric" value="Metric" />
            <DropDownItem title="Imperial" value="Imperial" hideSeperator={true} />
          </DropDown>
          <DropDown title="Walking Speed" initialSelected="Average" hideSeperator={true}>
            <DropDownItem title="Slow (2km/h)" value="Slow" />
            <DropDownItem title="Average (4km/h)" value="Average" />
            <DropDownItem title="Fast (6km/h)" value="Fast" hideSeperator={true} />
          </DropDown>
        </SettingsGroup>
        
        <SettingsGroup title="Theme">
          <ToggleSetting title="Dark Theme" hideSeperator={true} />
        </SettingsGroup>
        
        <SettingsGroup title="Night Detection">
          <ToggleSetting title="Auto Enable Street Lights" initialValue={true} hideSeperator={true} />
        </SettingsGroup>
        
        <SettingsGroup title="Accessibility">
          <ToggleSetting title="Reduce Motion" hideSeperator={true} />
          <ToggleSetting title="Increase Contrast" hideSeperator={true} />
        </SettingsGroup>
        
        <SettingsGroup title="About">
          <SettingsSubPage title="Information" navigateFunc={() => router.navigate("/information")} />
          <SettingsSubPage title="Other" navigateFunc={() => router.navigate("/other")} />
        </SettingsGroup>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "bold",
    width: "100%",
    marginTop: "20%",
    marginLeft: "10%"
  }
});