import { colours } from "@Theme/colours";
import WebLinkButton from "@Components/WebLinkButton";
import SettingsGroup from "@Components/Settings/SettingsGroup";
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
            backgroundColor: isLight ? colours.background[100] : colours.dark.background[100],
          },
          headerTitleStyle: {
            color: isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT,
          },
          headerTintColor: isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT,
        }} />

        <SettingsGroup title="Project Information">
          <View className="w-full bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]">
            <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">
              This app was developed by a team of Swinburne University of Technology students as part of a capstone project. The project involved operationalising the City of Casey's Open Data Exchange, leading to the development of this community walk planning app. 
              {"\n\n"}
              The data points shown on the map are sourced from publicly available open data portals, primarily provided by the City of Casey. This app intends to help City of Casey residents to find new walking routes with useful features and utilities and encourage other developers to also create projects with the open data.
            </Text>
          </View>
          <WebLinkButton text="Project Source Code" link="https://github.com/chiragluitel/Liveable-Cities" />
        </SettingsGroup>\

        <SettingsGroup title="Open Data Information">
          <View className="w-full bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15] border-b-text-200 dark:border-b-dark-text-400 border-b-hairline">
            <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">
              The City of Casey Open Data is a collection of freely available public datasets containing information about local facilities, services, infrastructure, and environmental features. 
              {"\n\n"}
              The platform allows residents, businesses, and developers to access, use, and share council data to support informed decisions, increase council transparency, encourage social innovation and economic growth, and help identify gaps or inaccuracies in the data.
            </Text>
          </View>
          <WebLinkButton text="City of Casey Open Data Portal" link="https://data.casey.vic.gov.au/pages/home/" />
          <WebLinkButton text="City of Casey Home Page" link="https://www.casey.vic.gov.au/" />
        </SettingsGroup>
      </ScrollView>
    </View>
  );
}