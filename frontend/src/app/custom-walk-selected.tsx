import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import SelectedWalkScreen from "@Components/SelectedWalk/SelectedWalkScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const getStringParam = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) return value[0];
  return value;
};

const getSelectedFiltersParam = (value: string | string[] | undefined) => {
  const selectedFiltersText = getStringParam(value);

  if (!selectedFiltersText) return [];

  return selectedFiltersText
    .split("|")
    .map((filter) => filter.trim())
    .filter((filter) => filter.length > 0);
};

export default function CustomWalkSelectedPage() {
  const params = useLocalSearchParams<{
    title?: string;
    distance?: string;
    selectedFilters?: string;
  }>();

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const title = getStringParam(params.title);
  const distance = getStringParam(params.distance);
  const selectedFilters = getSelectedFiltersParam(params.selectedFilters);

  return (
    <View className="flex-1 bg-background-50 dark:bg-dark-background-50">
      <Stack.Screen options={{ headerShown: false }} />

      <SelectedWalkScreen
        variant="custom"
        titleOverride={title}
        distanceOverride={distance}
        selectedFiltersOverride={selectedFilters}
      />

      <TouchableOpacity
        style={[styles.backBtnShadown, { top: insets.top + 12 }]}
        onPress={() => router.back()}
        className="absolute left-[16] py-[8] px-[14] bg-background-200 dark:bg-dark-background-400 rounded-[8]"
      >
        <Text className="text-base font-semibold text-dark-text-200 dark:text-dark-text">
          ‹ Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backBtnShadown: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});