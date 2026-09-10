import React from "react";
import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";


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
	const { colorScheme } = useColorScheme();
	const isLight = colorScheme === "light";

  return (
    <View className="mb-[6px]">
      <View className="flex-row justify-between items-start mb-[6px]">
        <Text className="flex-1 text-[29px] leading-[35px] font-black text-text dark:text-dark-text mr-3">{title}</Text>
      </View>

      <Text className="text-[17px] text-text dark:text-dark-text mb-[22px]">
        <Text className="text-accent-600 dark:text-dark-accent-700">
          {distanceText}{durationText ? `, ${durationText}` : ''}
        </Text>
      </Text>
    </View>
  );
}
