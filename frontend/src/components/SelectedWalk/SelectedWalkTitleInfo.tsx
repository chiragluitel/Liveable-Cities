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
    <View className="mb-[6]">
      <View className="mb-[6]">
        <Text className="text-3xl font-extrabold text-text dark:text-dark-text">
          {title}
        </Text>
      </View>

      <Text className="text-base text-text dark:text-dark-text mb-[22]">
        <Text className="text-accent dark:text-dark-accent-700">
          {distanceText}, {durationText}
        </Text>
      </Text>
    </View>
  );
}