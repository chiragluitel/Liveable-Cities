import ClearDataButton from "@/src/components/settings/ClearDataButton/ClearDataButton";
import SettingsGroup from "@/src/components/settings/SettingsGroup";
import WebLinkButton from "@/src/components/WebLinkButton";
import { Stack } from "expo-router";
import { Text, View, ScrollView, StyleSheet } from "react-native";

export default function Information() {
  return (
    <View
      style={{
        flex: 1,
        width: "100%"
      }}
    >
      <ScrollView
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        <Stack.Screen options={{
          headerTitle: "Other", 
          headerTitleAlign: "center",
        }} />

        <SettingsGroup title="Privacy Notice">
          <View style={styles.textSectionLast}>
            <Text style={{fontSize: 17}}>
              We follow the 13 APPs.
            </Text>
          </View>
        </SettingsGroup>

        <SettingsGroup title="Version Information">
          <View style={styles.textSectionLast}>
            <Text style={{fontSize: 17}}>
              Version 0.0.1
            </Text>
          </View>
        </SettingsGroup>

        <SettingsGroup title="Data Management">
          <ClearDataButton />
        </SettingsGroup>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textSection: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    borderBottomColor: "#c7c7cc",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textSectionLast: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  }
});