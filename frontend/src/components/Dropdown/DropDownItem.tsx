import Entypo from "@expo/vector-icons/Entypo"
import { Text, TouchableHighlight, View } from "react-native";

export type ItemProps = {
  title: string
  value: string
  onPressFunc?: (value: string) => void   // Optional as it will often be set by the parent DropDown, not when created
  isSelected?: boolean    // Optional as it will often be set by the parent Dropdown, not when created
  hideSeperator?: boolean
};

export default function DropDownItem({
  title, 
  value, 
  onPressFunc = () => {}, 
  isSelected = false, 
  hideSeperator= false
}: ItemProps) {
  return (
    <TouchableHighlight 
      onPress={() => onPressFunc(value)}
      underlayColor="#747480"
    >
      <View className={`flex-row justify-between bg-white p-[15] pl-[20] ${hideSeperator ? "" : "border-b-[#C7C7CC] border-b-hairline"}`}>
        <Text style={{fontSize: 17}}>
          {title} 
        </Text>
        <Entypo name="check" size={20} color={"#007bfe"} style={{opacity: isSelected ? 1 : 0}} />
      </View>
    </TouchableHighlight>
  );
}