import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NearbyPlace, NearbyPlaceType } from "@Types/TypesForSelectedWalk";

type SelectedWalkNearbyItemProps = {
  place: NearbyPlace;
  isSelected: boolean;
  onNearbyPress: (place: NearbyPlace) => void;
};

const getPlaceStyle = (placeType: NearbyPlaceType) => {
  switch (placeType) {
    case "bbq":
      return {
        backgroundColor: "#f4d7b5",
        emoji: "🍖",
      };

    case "library":
      return {
        backgroundColor: "#d9e8ff",
        emoji: "📚",
      };

    case "bench":
      return {
        backgroundColor: "#dfe3de",
        emoji: "🪑",
      };

    case "toilet":
      return {
        backgroundColor: "#d9d4ff",
        emoji: "🚻",
      };

    default:
      return {
        backgroundColor: "#dcdedd",
        emoji: "📍",
      };
  }
};

export default function SelectedWalkNearbyItem({
  place,
  isSelected,
  onNearbyPress,
}: SelectedWalkNearbyItemProps) {
  const placeStyle = getPlaceStyle(place.placeType);

  return (
    <Pressable
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={() => onNearbyPress(place)}
    >
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: placeStyle.backgroundColor },
        ]}
      >
        <Text style={styles.emoji}>{placeStyle.emoji}</Text>
      </View>

      <Text style={styles.label}>{place.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  selectedContainer: {
    backgroundColor: "#f0f1ed",
  },
  iconCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },
  emoji: {
    fontSize: 30,
  },
  label: {
    fontSize: 18,
    color: "#111",
    fontWeight: "400",
  },
});