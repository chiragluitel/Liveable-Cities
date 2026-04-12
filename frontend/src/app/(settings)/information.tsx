import WebLinkButton from "@Components/WebLinkButton";
import SettingsGroup from "@Components/settings/SettingsGroup";
import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Information() {
  return (
    <View className="flex-1 w-full">
      <ScrollView
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        <Stack.Screen options={{
          headerTitle: "Information", 
          headerTitleAlign: "center",
        }} />

        <SettingsGroup title="Project Information">
          <View className="w-full bg-white rounded-[10] p-[15]">
            <Text style={{fontSize: 17}}>
              This project serves to help the community have better access to local facilities while walking.
            </Text>
          </View>
        </SettingsGroup>

        <SettingsGroup title="Team Information">
          <View className="w-full bg-white rounded-[10] p-[15]">
            <Text style={{fontSize: 17}}>
              We are a group of Swinburne students completing this project as part of our capstone subject.
            </Text>
          </View>
        </SettingsGroup>

        <SettingsGroup title="Open Data Information">
          <View className="w-full bg-white rounded-[10] p-[15] border-b-[#c7c7cc] border-b-hairline">
            <Text style={{fontSize: 17}}>
              The City of Casey's Open Data Exchange is a way for the city to make various datasets publicly available.
            </Text>
          </View>
          <WebLinkButton text="City of Casey Open Data Portal" link="https://data.casey.vic.gov.au/pages/home/" />
        </SettingsGroup>
      </ScrollView>
    </View>
  );
}