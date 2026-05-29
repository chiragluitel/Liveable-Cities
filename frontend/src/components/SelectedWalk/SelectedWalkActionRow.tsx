import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";

export default function SelectedWalkActionRow() {
	const { colorScheme } = useColorScheme();
	const isLight = colorScheme === "light";

  return (
    <View className="flex-row mb-5">
      <Pressable className="flex-1 bg-primary-300 dark:bg-dark-accent-300 rounded-[18px] py-[18px] justify-center items-center mr-[10px]" onPress={() => console.log('Start Walk pressed')}>
        <Ionicons name="navigate-circle-outline" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
        <Text className="text-text dark:text-dark-text font-bold text-[15px] mt-2">Start Walk</Text>
      </Pressable>

      <Pressable className="flex-1 bg-primary-100 dark:bg-dark-accent-100 rounded-[18px] py-[18px] justify-center items-center mr-[10px]" onPress={() => console.log('Download pressed')}>
        <Ionicons name="download-outline" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
        <Text className="text-text dark:text-dark-text font-bold text-[15px] mt-2">Download</Text>
      </Pressable>

      <Pressable className="flex-1 bg-primary-100 dark:bg-dark-accent-100 rounded-[18px] py-[18px] justify-center items-center mr-[10px]" onPress={() => console.log('More pressed')}>
        <Ionicons name="ellipsis-horizontal" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
        <Text className="text-text dark:text-dark-text font-bold text-[15px] mt-2">More</Text>
      </Pressable>
    </View>
  );
}
