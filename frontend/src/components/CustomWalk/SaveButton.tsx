import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";

type SaveButtonProps = {
  onPress: () => void;
  title: string;
};

export default function SaveButton({ onPress, title }: SaveButtonProps) {
  const { colorScheme } = useColorScheme();
  const isLight = colorScheme === "light";

  return (
    <TouchableOpacity className="flex-row bg-accent-400 dark:bg-dark-accent-400 p-4 rounded-xl items-center justify-center mt-5 mb-10" onPress={onPress}>
      <Ionicons name="save" size={24} color={isLight ? colours.text[50] : colours.dark.text.DEFAULT} />
      <Text className="text-text-50 dark:text-dark-text text-lg font-semibold ml-2">{title}</Text>
    </TouchableOpacity>
  );
}
