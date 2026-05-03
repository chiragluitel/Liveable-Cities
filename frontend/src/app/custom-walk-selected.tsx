import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import SelectedWalkScreen from "@Components/SelectedWalk/SelectedWalkScreen";

export default function CustomWalkSelectedPage() {
  const params = useLocalSearchParams<{ title?: string }>();

  return (
    <View style={styles.page}>
      <Stack.Screen
        options={{
          title: "Custom Walk",
          headerBackTitle: "Back",
        }}
      />

      <SelectedWalkScreen variant="custom" titleOverride={params.title} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});