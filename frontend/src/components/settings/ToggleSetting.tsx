import SlideToggle from "@Components/SlideToggle";
import { useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";

type ToggleProps = {
  title: string
  initialValue?: boolean
  hideSeperator?: boolean
};

export default function ToggleSetting({
  title = "{title}", 
  hideSeperator = false, 
  initialValue = false, 
}: ToggleProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <View className={`w-full bg-white rounded-[10] ${hideSeperator ? "" : "border-b-[#C7C7CC] border-b-hairline"}`}>
      <TouchableHighlight
        onPress={() => setValue(!value)}
        className="rounded-[10]"
        underlayColor="#747480"
      >
        <View className="flex-row justify-between bg-white rounded-[10] p-[15]">
          <Text style={{fontSize: 17}}>{title}</Text>
          <SlideToggle value={value} onValueChange={setValue} />
        </View>
      </TouchableHighlight>
    </View>
  );
}