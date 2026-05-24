import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import SelectedWalkScreen from "@Components/SelectedWalk/SelectedWalkScreen";

export default function CustomWalkSelectedPage() {
  const params = useLocalSearchParams<{ title?: string }>();

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: "Custom Walk",
          headerBackTitle: "Home",
        }}
      />

      <SelectedWalkScreen variant="custom" titleOverride={params.title} />
    </View>
  );
}
