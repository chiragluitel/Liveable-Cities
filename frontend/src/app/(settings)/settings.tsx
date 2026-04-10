import DropDown from "@/src/components/settings/Dropdown/DropDown";
import DropDownItem from "@/src/components/settings/Dropdown/DropDownItem";
import SettingsGroup from "@/src/components/settings/SettingsGroup";
import { Stack } from "expo-router";
import { ScrollView, View, Text } from "react-native";

export default function Settings() {
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
        <Stack.Screen 
          options={{
            headerTitle: "Settings",
            headerTitleStyle: {
              fontSize: 34
            }
          }}
          />
        <SettingsGroup title="Measurements">
          <DropDown title="Units" initialValue="Metric">
            <DropDownItem title="Metric" value="Metric" />
            <DropDownItem title="Imperial" value="Imperial" hideSeperator={true} />
          </DropDown>
          <DropDown title="Walking Speed" initialValue="Average" hideSeperator={true}>
            <DropDownItem title="Slow (2km/h)" value="Slow" />
            <DropDownItem title="Average (4km/h)" value="Average" />
            <DropDownItem title="Fast (6km/h)" value="Fast" hideSeperator={true} />
          </DropDown>
        </SettingsGroup>

        <SettingsGroup title="Language">
          <DropDown title="Units" hideSeperator={true}>
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Imperial" value="imperial" hideSeperator={true} />
          </DropDown>
        </SettingsGroup>
        
        <SettingsGroup title="Theme">
          <DropDown title="Units" hideSeperator={true}>
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Imperial" value="imperial" hideSeperator={true} />
          </DropDown>
        </SettingsGroup>
        
        <SettingsGroup title="Night Detection">
          <DropDown title="Units" hideSeperator={true}>
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Imperial" value="imperial" hideSeperator={true} />
          </DropDown>
        </SettingsGroup>
        
        <SettingsGroup title="Accessibility">
          <DropDown title="Units">
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Imperial" value="imperial" hideSeperator={true} />
          </DropDown>
          <DropDown title="Units" hideSeperator={true}>
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Imperial" value="imperial" hideSeperator={true} />
          </DropDown>
        </SettingsGroup>
        
        <SettingsGroup title="Other">
          <DropDown title="Units">
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Imperial" value="imperial" hideSeperator={true} />
          </DropDown>
          <DropDown title="Units" hideSeperator={true}>
            <DropDownItem title="Metric" value="metric" />
            <DropDownItem title="Imperial" value="imperial" hideSeperator={true} />
          </DropDown>
        </SettingsGroup>
      </ScrollView>
      <Text style={{alignSelf: "center", backgroundColor: "#dddddd", padding: 25, width: "100%"}}>
        Navigation goes here
      </Text>
    </View>
  );
}
