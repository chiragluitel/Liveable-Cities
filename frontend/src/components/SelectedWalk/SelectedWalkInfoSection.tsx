import React from "react";
import { Text, View } from "react-native";

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
    <View className="pt-[6px] pb-3 mb-[10px]">
      <Text className="text-[17px] font-bold text-[#111] mb-2">{title}</Text>
      <Text className="text-[15px] leading-6 text-[#222]">{text}</Text>

      {hasSelectedFilters && (
        <View className="flex-row flex-wrap mt-[14px]">
          {selectedFilters.map((filter) => (
            <View key={filter} className="bg-[#d7d7db] rounded-full px-[14px] py-2 mr-[10px] mb-[10px]">
              <Text className="text-[#111] text-[13px] font-semibold">{filter}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
