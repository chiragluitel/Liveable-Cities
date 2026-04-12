import ClearDataButton from "@Components/settings/ClearDataButton/ClearDataButton";
import SettingsGroup from "@Components/settings/SettingsGroup";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Information() {
  return (
    <View className="flex-1 w-full">
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
          <View className="w-full bg-white rounded-[10] p-[15]">
            <Text style={{fontSize: 17}}>
              We follow the 13 APPs.
            </Text>
          </View>
        </SettingsGroup>

        <SettingsGroup title="Version Information">
          <View className="w-full bg-white rounded-[10] p-[15]">
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