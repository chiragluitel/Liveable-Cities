import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import SelectedWalkScreen from "@Components/SelectedWalk/SelectedWalkScreen";

export default function WalkSelectedPage() {
  const params = useLocalSearchParams<{ title?: string }>();

  return (
    <View style={styles.page}>
      <Stack.Screen
        options={{
          title: "Walk Selected",
          headerBackTitle: "Back",
        }}
      />

      <SelectedWalkScreen variant="default" titleOverride={params.title} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});