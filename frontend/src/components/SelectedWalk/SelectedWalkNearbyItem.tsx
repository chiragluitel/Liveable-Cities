import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NearbyPlace } from "../../types/TypesForSelectedWalk";

type Props = {
  item: NearbyPlace;
  isSelected: boolean;
  onPress: (item: NearbyPlace) => void;
};

export default function SelectedWalkNearbyItem({
  item,
  isSelected,
  onPress,
}: Props) {
  const renderIcon = () => {
    if (item.iconFamily === "MaterialIcons") {
      return (
        <MaterialIcons
          name={item.iconType as keyof typeof MaterialIcons.glyphMap}
          size={28}
          color="#111"
        />
      );
    }

    return (
      <Ionicons
        name={item.iconType as keyof typeof Ionicons.glyphMap}
        size={26}
        color="#111"
      />
    );
  };

  return (
    <Pressable
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={() => onPress(item)}
    >
      <View style={[styles.iconCircle, { backgroundColor: item.bgColor }]}>
        {renderIcon()}
      </View>

      <Text style={styles.label}>{item.label}</Text>
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