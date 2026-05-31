import React from "react";
import { Text, View } from "react-native";

export default function SelectedWalkImageGallery() {
  return (
    <View className="flex-row mb-[18px]">
      <View className="flex-1 h-[150px] rounded-2xl bg-[#cfcfcf] justify-center items-center mr-[10px]">
        <Text className="text-[#666] text-sm">Image 1</Text>
      </View>

      <View className="flex-1 h-[150px] rounded-2xl bg-[#cfcfcf] justify-center items-center mr-[10px]">
        <Text className="text-[#666] text-sm">Image 2</Text>
      </View>

      <View className="w-[70px] h-[150px] rounded-2xl bg-[#cfcfcf] justify-center items-center">
        <Text className="text-[#666] text-sm">Image 3</Text>
      </View>
    </View>
  );
}
