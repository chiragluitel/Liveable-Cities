import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Flame, BookOpen, Armchair, PersonStanding, MapPin } from "lucide-react-native";
import { NearbyPlace, NearbyPlaceType } from "@Types/walkDetailTypes";

type SelectedWalkNearbyItemProps = {
  place: NearbyPlace;
  isSelected: boolean;
  onNearbyPress: (place: NearbyPlace) => void;
};

const PLACE_STYLES: Record<string, { backgroundColor: string; icon: React.ReactElement }> = {
  bbq:     { backgroundColor: '#f4d7b5', icon: <Flame size={30} color="#f97316" /> },
  library: { backgroundColor: '#d9e8ff', icon: <BookOpen size={30} color="#3b82f6" /> },
  bench:   { backgroundColor: '#dfe3de', icon: <Armchair size={30} color="#22c55e" /> },
  toilet:  { backgroundColor: '#d9d4ff', icon: <PersonStanding size={30} color="#8b5cf6" /> },
};

const DEFAULT_PLACE_STYLE = { backgroundColor: '#dcdedd', icon: <MapPin size={30} color="#555" /> };

export default function SelectedWalkNearbyItem({
  place,
  isSelected,
  onNearbyPress,
}: SelectedWalkNearbyItemProps) {
  const placeStyle = PLACE_STYLES[place.placeType] ?? DEFAULT_PLACE_STYLE;

  return (
    <Pressable
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={() => onNearbyPress(place)}
    >
      <View style={[styles.iconCircle, { backgroundColor: placeStyle.backgroundColor }]}>
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
});
