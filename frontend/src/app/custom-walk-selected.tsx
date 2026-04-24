import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import SelectedWalkScreen from "../components/SelectedWalk/SelectedWalkScreen";

export default function CustomWalkSelectedPage() {
  const params = useLocalSearchParams<{ title?: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Custom Walk",
          headerBackTitle: "Back",
        }}
      />

      <SelectedWalkScreen
        variant="custom"
        titleOverride={params.title}
      />
    </>
  );
}