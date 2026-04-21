import { colors } from "@Theme/colours";
import Entypo from "@expo/vector-icons/Entypo"
import { useColorScheme } from "nativewind";
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
  const { colorScheme } = useColorScheme();
  
  const isLight = colorScheme === "light";

  return (
    <TouchableHighlight 
      onPress={() => onPressFunc(value)}
      underlayColor={isLight ? colors.background[300] : colors.dark.background[100]}
    >
      <View className={`flex-row justify-between bg-background-50 dark:bg-dark-background-200 p-[15] pl-[20] 
        ${hideSeperator ? "" : "border-b-text-200 dark:border-b-dark-text-400 border-b-hairline"}`}>
        <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">
          {title} 
        </Text>
        <Entypo name="check" size={20} color={isLight ? colors.accent[600] : colors.dark.accent[700]} style={{opacity: isSelected ? 1 : 0}} />
      </View>
    </TouchableHighlight>
  );
}