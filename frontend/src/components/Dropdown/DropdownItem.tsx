import { colours } from "@Theme/colours";
import Entypo from "@expo/vector-icons/Entypo"
import { useColorScheme } from "nativewind";
import { Text, TouchableHighlight, View } from "react-native";
import { useDropdownContext } from "./Dropdown";

export type ItemProps = {
  title: string
  value: string
  onPressFunc?: (value: string) => void   // Optional as it will often be set by the parent DropDown, not when created
  isSelected?: boolean    // Optional as it will often be set by the parent Dropdown, not when created
  hideSeperator?: boolean
};

export default function DropdownItem({
  title, 
  value, 
  isSelected: selVal = false, 
  hideSeperator= false
}: ItemProps) {
  const { itemPressed, isSelected } = useDropdownContext();

  selVal = isSelected(value);

  const { colorScheme } = useColorScheme();
  
  const isLight = colorScheme === "light";

  return (
    <TouchableHighlight 
      onPress={() => itemPressed(value)}
      underlayColor={isLight ? colours.background[300] : colours.dark.background[100]}
    >
      <View className={`flex-row justify-between bg-background-50 dark:bg-dark-background-200 p-[15] pl-[20] 
        ${hideSeperator ? "" : "border-b-text-200 dark:border-b-dark-text-400 border-b-hairline"}`}>
        <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">
          {title} 
        </Text>
        <Entypo name="check" size={20} color={isLight ? colours.accent[600] : colours.dark.accent[700]} style={{opacity: selVal ? 1 : 0}} />
      </View>
    </TouchableHighlight>
  );
}