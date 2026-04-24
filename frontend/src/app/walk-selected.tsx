import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import SelectedWalkScreen from "../components/SelectedWalk/SelectedWalkScreen";

export default function WalkSelectedPage() {
  const params = useLocalSearchParams<{ title?: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Walk Selected",
          headerBackTitle: "Back",
        }}
      />

      <SelectedWalkScreen
        variant="default"
        titleOverride={params.title}
      />
    </>
  );
}