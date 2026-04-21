import { colors } from "@Theme/colours";
import SlideToggle from "@Components/SlideToggle";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";

type ToggleProps = {
  title: string
  initialValue: boolean
  hideSeperator?: boolean
};

export default function ToggleSetting({title, initialValue, hideSeperator = false}: ToggleProps) {
  const [value, setValue] = useState(initialValue);

  const { colorScheme } = useColorScheme();
    
  const isLight = colorScheme === "light";

  return (
    <View className={`w-full  bg-background-100 dark:bg-dark-background-100 rounded-[10] 
    ${hideSeperator ? "" : "border-b-text-200 dark:border-b-dark-text-400 border-b-hairline"}`}>
      <TouchableHighlight
        onPress={() => setValue(!value)}
        className="rounded-[10]"
        underlayColor={isLight ? colors.background[400] : colors.dark.background[50]}
      >
        <View className="flex-row justify-between bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]">
          <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">{title}</Text>
          <SlideToggle value={value} onValueChange={setValue} />
        </View>
      </TouchableHighlight>
    </View>
  );
}