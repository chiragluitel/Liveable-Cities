import React, { useState } from "react";
import { Text, View } from "react-native";
import { NearbyPlace } from "@Types/TypesForSelectedWalk";
import SelectedWalkNearbyItem from "./SelectedWalkNearbyItem";

type SelectedWalkNearbyListProps = {
  nearbyList: NearbyPlace[];
};

export default function SelectedWalkNearbyList({
  nearbyList,
}: SelectedWalkNearbyListProps) {
  const [selectedNearbyId, setSelectedNearbyId] = useState<string | null>(null);

  const handleNearbyPress = (nearbyPlace: NearbyPlace) => {
    setSelectedNearbyId(nearbyPlace.id);
    console.log(`${nearbyPlace.label} pressed`);
  };

  return (
    <View className="mt-[8]">
      <Text className="text-lg font-medium text-text dark:text-dark-text mt-[14]">Nearby</Text>

      {nearbyList.map((nearbyPlace) => (
        <SelectedWalkNearbyItem
          key={nearbyPlace.id}
          place={nearbyPlace}
          isSelected={selectedNearbyId === nearbyPlace.id}
          onNearbyPress={handleNearbyPress}
        />
      ))}
    </View>
  );
}