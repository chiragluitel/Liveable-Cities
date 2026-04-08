import DropDown from "@/src/components/settings/Dropdown/DropDown";
import SettingsGroup from "@/src/components/settings/SettingsGroup";
import { Stack } from "expo-router";
import { ScrollView, View, Text } from "react-native";

export default function SettingsIndex() {
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
          <DropDown title="Units" />
          <DropDown title="Walking Speed" />
        </SettingsGroup>

        <SettingsGroup title="Language">
          <DropDown title="Units" />
          <DropDown title="Walking Speed" />
        </SettingsGroup>
        
        <SettingsGroup title="Theme">
          <DropDown title="Units" />
        </SettingsGroup>
        
        <SettingsGroup title="Night Detection">
          <DropDown title="Units" />
        </SettingsGroup>
        
        <SettingsGroup title="Accessibility">
          <DropDown title="Units" />
          <DropDown title="Units" />
        </SettingsGroup>
        
        <SettingsGroup title="Other">
          <DropDown title="Units" />
          <DropDown title="Units" />
        </SettingsGroup>
      </ScrollView>
      <Text style={{alignSelf: "center", backgroundColor: "#dddddd", padding: 25, width: "100%"}}>
        Navigation goes here
      </Text>
    </View>
  );
}
