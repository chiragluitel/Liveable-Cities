import React from "react";
import { StyleSheet, Text, View } from "react-native";

type SelectedWalkInfoSectionProps = {
  title: string;
  text: string;
  selectedFilters?: string[];
};

export default function SelectedWalkInfoSection({
  title,
  text,
  selectedFilters,
}: SelectedWalkInfoSectionProps) {
  const hasSelectedFilters = selectedFilters && selectedFilters.length > 0;

  return (
    <View className="pt-[8] pb-[12] mb-[12]">
      <Text className="text-base font-bold text-text dark:text-dark-text mb-[8]">{title}</Text>
      <Text className="text-base text-text-700 dark:text-dark-text-700">{text}</Text>

      {hasSelectedFilters && (
        <View className="flex-row flex-wrap mt-[14]">
          {selectedFilters.map((filter) => (
            <View key={filter} className="bg-background-200 dark:bg-dark-background-400 rounded-[20] px-[14] py-[8] mr-[10] mb-[10]">
              <Text className="text-text dark:text-dark-text-900 text-sm font-semibold">{filter}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}