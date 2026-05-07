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
      //style={[styles.container, isSelected && styles.selectedContainer]}
      className={`flex-row items-center mb-[22] rounded-[16] py-[6] px-[4] ${isSelected ? "bg-primary-100 dark:bg-dark-primary-300" : ""}`}
      onPress={() => onNearbyPress(place)}
    >
      <View
        style={{ backgroundColor: placeStyle.backgroundColor }}
        className="w-[74] h-[74] rounded-[37] justify-center items-center mr-[18]"
      >
        <Text className="text-3xl">{placeStyle.emoji}</Text>
      </View>

      <Text className="text-lg text-text dark:text-dark-text font-normal">{place.label}</Text>
    </Pressable>
  );
}