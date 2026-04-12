import SlideToggle from "@Components/SlideToggle";
import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

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
        style={{borderRadius: 10}}
        underlayColor="#747480"
      >
        <View style={styles.button}>
          <Text style={{fontSize: 17}}>{title}</Text>
          <SlideToggle value={value} onValueChange={setValue} />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  settingRow: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    borderBottomColor: "#c7c7cc",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  settingRowNoSep: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15
  },
});