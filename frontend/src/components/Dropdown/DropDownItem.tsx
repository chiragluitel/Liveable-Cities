import Entypo from "@expo/vector-icons/Entypo"
import { Text, TouchableHighlight, View } from "react-native";
import { useDropDownContext } from "./DropDown";

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
  isSelected: selVal = false, 
  hideSeperator= false
}: ItemProps) {
  const { itemPressed, isSelected } = useDropDownContext();

  selVal = isSelected(value);
  
  return (
    <TouchableHighlight 
      onPress={() => itemPressed(value)}
      underlayColor="#747480"
    >
      <View className={`flex-row justify-between bg-white p-[15] pl-[20] ${hideSeperator ? "" : "border-b-[#C7C7CC] border-b-hairline"}`}>
        <Text style={{fontSize: 17}}>
          {title} 
        </Text>
        <Entypo name="check" size={20} color={"#007bfe"} style={{opacity: selVal ? 1 : 0}} />
      </View>
    </TouchableHighlight>
  );
}