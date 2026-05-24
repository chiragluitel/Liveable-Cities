import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import SelectedWalkScreen from "@Components/SelectedWalk/SelectedWalkScreen";

export default function WalkSelectedPage() {
  const params = useLocalSearchParams<{ title?: string }>();

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: "Walk Selected",
          headerBackTitle: "Home",
        }}
      />

      <SelectedWalkScreen variant="default" titleOverride={params.title} />
    </View>
  );
}
