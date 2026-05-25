import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

type SelectedWalkTitleInfoProps = {
  title: string;
  distanceText: string;
  durationText: string;
};

export default function SelectedWalkTitleInfo({
  title,
  distanceText,
  durationText,
}: SelectedWalkTitleInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.walkName}>{title}</Text>

        <Pressable style={styles.circleIconButton}>
          <Feather name="share" size={20} color="#8a8a8a" />
        </Pressable>
      </View>

      <Text style={styles.walkMeta}>
        <Text style={styles.blueText}>
          {distanceText}, {durationText}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  walkName: {
    flex: 1,
    fontSize: 29,
    lineHeight: 35,
    fontWeight: "800",
    color: "#111",
    marginRight: 12,
  },
  circleIconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#dfe3de",
    justifyContent: "center",
    alignItems: "center",
  },
  walkMeta: {
    fontSize: 17,
    color: "#111",
    marginBottom: 22,
  },
  blueText: {
    color: "#2677e8",
  },
});