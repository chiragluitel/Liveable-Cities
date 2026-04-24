import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NearbyPlace } from "../../types/TypesForSelectedWalk";
import SelectedWalkNearbyItem from "./SelectedWalkNearbyItem";

type Props = {
  nearby: NearbyPlace[];
  selectedNearbyId: string | null;
  onNearbyPress: (item: NearbyPlace) => void;
};

export default function SelectedWalkNearbyList({
  nearby,
  selectedNearbyId,
  onNearbyPress,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nearby</Text>

      {nearby.map((item) => (
        <SelectedWalkNearbyItem
          key={item.id}
          item={item}
          isSelected={selectedNearbyId === item.id}
          onPress={onNearbyPress}
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