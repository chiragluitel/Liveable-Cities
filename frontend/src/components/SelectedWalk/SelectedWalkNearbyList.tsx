import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.heading}>Nearby</Text>

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

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111",
    marginBottom: 14,
  },
});