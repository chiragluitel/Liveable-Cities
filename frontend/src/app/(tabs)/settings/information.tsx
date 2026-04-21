import { colors } from "@Theme/colours";
import WebLinkButton from "@Components/WebLinkButton";
import SettingsGroup from "@Components/settings/SettingsGroup";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { ScrollView, Text, View } from "react-native";

export default function Information() {
  const { colorScheme } = useColorScheme();
  
  const isLight = colorScheme === "light";

  return (
    <View className="flex-1 w-full bg-background-50 dark:bg-dark-background-50">
      <ScrollView
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        <Stack.Screen options={{
          headerTitle: "Information", 
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: isLight ? colors.background[200] : colors.dark.background[100],
          },
          headerTitleStyle: {
            color: isLight ? colors.text.DEFAULT : colors.dark.text.DEFAULT,
          },
          headerTintColor: isLight ? colors.text.DEFAULT : colors.dark.text.DEFAULT,
        }} />

        <SettingsGroup title="Project Information">
          <View className="w-full bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]">
            <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">
              This project serves to help the community have better access to local facilities while walking.
            </Text>
          </View>
        </SettingsGroup>

        <SettingsGroup title="Team Information">
          <View className="w-full bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]">
            <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">
              We are a group of Swinburne students completing this project as part of our capstone subject.
            </Text>
          </View>
        </SettingsGroup>

        <SettingsGroup title="Open Data Information">
          <View className="w-full bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15] border-b-text-200 dark:border-b-dark-text-400 border-b-hairline">
            <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">
              The City of Casey's Open Data Exchange is a way for the city to make various datasets publicly available.
            </Text>
          </View>
          <WebLinkButton text="City of Casey Open Data Portal" link="https://data.casey.vic.gov.au/pages/home/" />
        </SettingsGroup>
      </ScrollView>
    </View>
  );
}