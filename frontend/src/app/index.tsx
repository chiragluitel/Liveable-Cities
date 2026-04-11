import { StatusBar } from "expo-status-bar"
import { View } from "react-native";
import Settings from "./(settings)/settings";

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
