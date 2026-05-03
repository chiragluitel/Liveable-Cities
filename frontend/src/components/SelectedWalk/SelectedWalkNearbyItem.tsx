import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NearbyPlace, NearbyPlaceType } from "@Types/TypesForSelectedWalk";

type SelectedWalkNearbyItemProps = {
  place: NearbyPlace;
  isSelected: boolean;
  onNearbyPress: (place: NearbyPlace) => void;
};

const getPlaceStyle = (placeType: NearbyPlaceType) => {
  switch (placeType) {
    case "public-toilets":
      return {
        backgroundColor: "#9b94f1",
        icon: <MaterialIcons name="wc" size={28} color="#111" />,
      };

    case "park":
      return {
        backgroundColor: "#19c58a",
        icon: <Ionicons name="leaf-outline" size={26} color="#111" />,
      };

    case "rest-area":
      return {
        backgroundColor: "#b8c0b7",
        icon: <MaterialIcons name="event-seat" size={28} color="#111" />,
      };

    default:
      return {
        backgroundColor: "#dcdedd",
        icon: <Ionicons name="location-outline" size={26} color="#111" />,
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
        {placeStyle.icon}
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
  label: {
    fontSize: 18,
    color: "#111",
    fontWeight: "400",
  },
})