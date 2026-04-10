import { View } from "react-native";
import Settings from "./(settings)/settings";
import { StatusBar } from "expo-status-bar"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Settings />
      <StatusBar style="dark" />
    </View>
  );
}
