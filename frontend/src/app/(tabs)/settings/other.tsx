import { colors } from "@Theme/colours";
import ClearDataButton from "@Components/settings/ClearDataButton/ClearDataButton";
import SettingsGroup from "@Components/settings/SettingsGroup";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { ScrollView, Text, View } from "react-native";

export default function Information() {
  const { colorScheme } = useColorScheme();
  
  const isLight = colorScheme === "light";

  return (
    <View className="flex-1 w-full  bg-background-50 dark:bg-dark-background-50">
      <ScrollView
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        <Stack.Screen options={{
          headerTitle: "Other", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: isLight ? colors.background[100] : colors.dark.background[100],
          },
          headerTitleStyle: {
            color: isLight ? colors.text.DEFAULT : colors.dark.text.DEFAULT,
          },
          headerTintColor: isLight ? colors.text.DEFAULT : colors.dark.text.DEFAULT,
        }} />

        <SettingsGroup title="Privacy Notice">
          <View className="w-full bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]">
            <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">
              We follow the 13 APPs.
            </Text>
          </View>
        </SettingsGroup>

        <SettingsGroup title="Version Information">
          <View className="w-full bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]">
            <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">
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