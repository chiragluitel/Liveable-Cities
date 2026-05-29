import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import SelectedWalkScreen from "@Components/SelectedWalk/SelectedWalkScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function CustomWalkSelectedPage() {
  const params = useLocalSearchParams<{ title?: string }>();
  const router = useRouter();
  
  const insets = useSafeAreaInsets();

  // TODO: Check if header should be visible
  return (
    <View className="flex-1 bg-background-50 dark:bg-dark-background-50">
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