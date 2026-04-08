import { StatusBar } from 'expo-status-bar';
import { View } from "react-native";
import SettingsIndex from "./(settings)";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SettingsIndex />
      <StatusBar style="auto" />
    </View>
  );
}
