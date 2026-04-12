import Ionicons from "@expo/vector-icons/Ionicons"
import { Text, TouchableHighlight, View } from "react-native";

type SubPageProps = {
  title: string
  navigateFunc: () => void
  hideSeperator?: boolean
};

export default function SettingsSubPage({title, navigateFunc, hideSeperator = false}: SubPageProps) {
  return (
    <View className={`w-full bg-white rounded-[10] ${hideSeperator ? "" : "border-b-[#C7C7CC] border-b-hairline"}`}>
      <TouchableHighlight
        onPress={() => navigateFunc()}
        className="rounded-[10]"
        underlayColor="#747480"
      >
        <View className="flex-row justify-between bg-white rounded-[10] p-[15]">
          <Text style={{fontSize: 17}}>{title}</Text>
          <Ionicons name="chevron-forward" size={17} color="#8e8e93" />
        </View>
      </TouchableHighlight>
    </View>
  );
}