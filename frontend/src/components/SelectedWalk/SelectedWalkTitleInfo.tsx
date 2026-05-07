import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
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
    <View className="mb-[6]">
      <View className="flex-row justify-between items-start mb-[6]">
        <Text className="flex-1 text-3xl font-extrabold text-text dark:text-dark-text mr-[12]">{title}</Text>

        <Pressable className="w-[56] h-[56] rounded-[28] bg-background-100 dark:bg-dark-background-300 justify-center items-center">
          <Feather name="share" size={20} color={isLight ? colours.text[600] : colours.dark.text[600]} />
        </Pressable>
      </View>

      <Text className="text-base text-text dark:text-dark-text mb-[22]">
        <Text className="text-accent dark:text-dark-accent-700">
          {distanceText}, {durationText}
        </Text>
      </Text>
    </View>
  );
}