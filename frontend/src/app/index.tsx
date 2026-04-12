import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native";
import DropDown from "@/src/components/Dropdown/DropDown";
import DropDownItem from "@/src/components/Dropdown/DropDownItem";

export default function Index() {
  return (
    <View className="flex-1 w-full justify-center items-center">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <DropDown title="Test" initialSelected="item1" hideSeperator={true}>
        <DropDownItem title="Item 1" value="item1"/>
        <DropDownItem title="Item 2" value="item2" hideSeperator={true} />
      </DropDown>
      <StatusBar style="dark" />
    </View>
  );
}
