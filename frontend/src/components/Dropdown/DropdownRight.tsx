import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"

type DropdownProps = {
  selectedValue: string,
}

export default function DropdownRight({selectedValue}: DropdownProps) {
  return (
    <View className="flex-row">
      <Text style={{fontSize: 17, color: "#8e8e93"}}>
        {selectedValue} <Ionicons name="chevron-expand" size={17} />
      </Text>
    </View>
  );
}