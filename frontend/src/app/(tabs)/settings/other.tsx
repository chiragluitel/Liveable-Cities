import { colours } from "@Theme/colours";
import ClearDataButton from "@Components/Settings/ClearDataButton";
import SettingsGroup from "@Components/Settings/SettingsGroup";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useSettings } from "@/src/context/SettingsContext";
import { useState } from "react";
import RNRestart from 'react-native-restart';
import { version } from "../../../../package.json";
import WebLinkButton from "@/src/components/WebLinkButton";

export default function Information() {
  const { colorScheme } = useColorScheme();
  const {backendURL, setBackendURL} = useSettings();
  
  const isLight = colorScheme === "light";

  const [tempBackendURL, setTempBackendURL] = useState("");

  const updateBackendURL = () => {
    if (/^https?:\/\/(?:[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+|(?:\d{1,3}\.){3}\d{1,3})(?::\d{1,5})?(?:\/[^\s]*)?$/.test(tempBackendURL.toLowerCase())) {
      setBackendURL(tempBackendURL.toLowerCase());
      RNRestart.restart();
    }
    else {
      setTempBackendURL("");
    }
  }

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
            backgroundColor: isLight ? colours.background[100] : colours.dark.background[100],
          },
          headerTitleStyle: {
            color: isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT,
          },
          headerTintColor: isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT,
        }} />

        <SettingsGroup title="Privacy Notice">
          <View className="w-full bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]">
            <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">
              This app uses your location data temporarily to calculate walking routes. Your location is discarded after route calculation.
              {"\n\n"}
              If you create an account, your username and securely hashed password are stored to authenticate you and allow you to upload custom walking routes.
              Uploaded routes are publicly visible to anyone using the app.
              {"\n\n"}
              For full details about how information is handled, see the full Privacy Notice linked below.
            </Text>
          </View>
          <WebLinkButton text="Full Privacy Notice" link="https://github.com/chiragluitel/Liveable-Cities" />
        </SettingsGroup>

        <SettingsGroup title="Version Information">
          <View className="w-full bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]">
            <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">
              Version {version}
            </Text>
          </View>
        </SettingsGroup>

        <SettingsGroup title="Backend">
          <View className="w-full bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[10]">
            <TextInput 
              className="text-text dark:text-dark-text"
              value={tempBackendURL}
              placeholder={backendURL}
              onChangeText={setTempBackendURL}
              onSubmitEditing={() => {updateBackendURL()}}
            />
          </View>
        </SettingsGroup>

        <SettingsGroup title="Data Management">
          <ClearDataButton />
        </SettingsGroup>
      </ScrollView>
    </View>
  );
}