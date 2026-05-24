import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SelectedWalkActionRow() {
  return (
    <View className="flex-row mb-5">
      <Pressable className="flex-1 bg-black rounded-[18px] py-[18px] justify-center items-center mr-[10px]" onPress={() => console.log('Start Walk pressed')}>
        <Ionicons name="navigate-circle-outline" size={22} color="#fff" />
        <Text className="text-white font-bold text-[15px] mt-2">Start Walk</Text>
      </Pressable>

      <Pressable className="flex-1 bg-[#dcdedd] rounded-[18px] py-[18px] justify-center items-center mr-[10px]" onPress={() => console.log('Download pressed')}>
        <Ionicons name="download-outline" size={22} color="#111" />
        <Text className="text-[#111] font-bold text-[15px] mt-2">Download</Text>
      </Pressable>

      <Pressable className="flex-1 bg-[#dcdedd] rounded-[18px] py-[18px] justify-center items-center mr-[10px]" onPress={() => console.log('More pressed')}>
        <Ionicons name="ellipsis-horizontal" size={22} color="#111" />
        <Text className="text-[#111] font-bold text-[15px] mt-2">More</Text>
      </Pressable>
    </View>
  );
}
