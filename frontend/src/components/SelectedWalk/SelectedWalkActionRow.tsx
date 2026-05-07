import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";

export default function SelectedWalkActionRow() {
	const { colorScheme } = useColorScheme();
	const isLight = colorScheme === "light";

  return (
    <View className="flex flex-row mb-[20]">
      <Pressable className="flex-auto w-[20] bg-primary-300 dark:bg-dark-accent-300 rounded-[18] py-[18] justify-center items-center mr-[10]">
        <Ionicons name="navigate-circle-outline" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
        <Text className="text-text dark:text-dark-text font-bold text-base mt-[8]">Start Walk</Text>
      </Pressable>

      <Pressable className="flex-auto w-[10] bg-primary-100 dark:bg-dark-accent-100 rounded-[18] py-[18] justify-center items-center mr-[10]">
        <Ionicons name="download-outline" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
        <Text className="text-text dark:text-dark-text font-bold text-base mt-[18]">Download</Text>
      </Pressable>

      <Pressable className="flex-auto w-[10] bg-primary-100 dark:bg-dark-accent-100 rounded-[18] py-[18] justify-center items-center mr-[10]">
        <Ionicons name="ellipsis-horizontal" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
        <Text className="text-text dark:text-dark-text font-bold text-base mt-[18]">More</Text>
      </Pressable>
    </View>
  );
}