import React from "react";
import { Text, View } from "react-native";

type SelectedWalkTitleInfoProps = {
  title: string;
  distanceText: string;
  durationText: string;
};

export default function SelectedWalkTitleInfo({
  title,
  distanceText,
  durationText,
}: SelectedWalkTitleInfoProps) {
  return (
    <View className="mb-[6px]">
      <View className="flex-row justify-between items-start mb-[6px]">
        <Text className="flex-1 text-[29px] leading-[35px] font-black text-[#111] mr-3">{title}</Text>
      </View>

      <Text className="text-[17px] text-[#111] mb-[22px]">
        <Text className="text-[#2677e8]">
          {distanceText}, {durationText}
        </Text>
      </Text>
    </View>
  );
}
