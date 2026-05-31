import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";

export default function AddCustomWalkButton() {
  const { colorScheme } = useColorScheme();
  const isLight = colorScheme === "light";

  return (
    <Link href={"/custom-walk" as any} asChild>
      <TouchableOpacity className="flex-row bg-background-400 dark:bg-dark-background-300 rounded-xl items-center justify-center mb-6 p-4">
        <Ionicons name="add" size={24} color={isLight ? colours.text[50] : colours.dark.text.DEFAULT} />
        <Text className="text-text-50 dark:text-dark-text text-lg font-semibold ml-2">Add Custom Walk</Text>
      </TouchableOpacity>
    </Link>
  );
}
