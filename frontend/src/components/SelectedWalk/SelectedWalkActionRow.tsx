import React from "react";
import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";

type SelectedWalkActionRowProps = {
  onStartWalk?: () => void;
};

export default function SelectedWalkActionRow({
  onStartWalk,
}: SelectedWalkActionRowProps) {
  const { colorScheme } = useColorScheme();
  const isLight = colorScheme === "light";

  const handleStartWalkPress = () => {
    if (onStartWalk) {
      onStartWalk();
      return;
    }

    console.log("Start Walk pressed");
  };

  return (
    <Pressable
      onPress={handleStartWalkPress}
      className="w-full bg-primary-300 dark:bg-dark-accent-300 rounded-[18] py-[18] justify-center items-center mb-[24]"
    >
      <Ionicons
        name="navigate-circle-outline"
        size={24}
        color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT}
      />

      <Text className="text-text dark:text-dark-text font-bold text-base mt-[8]">
        Start Walk
      </Text>
    </Pressable>
  );
}