import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  title: string;
  distanceText: string;
  durationText: string;
};

export default function SelectedWalkMeta({
  title,
  distanceText,
  durationText,
}: Props) {
  return (
    <>
      <View style={styles.titleRow}>
        <Text style={styles.walkName}>{title}</Text>

        <View style={styles.topRightIcons}>
          <Pressable style={styles.circleIconButton}>
            <Feather name="share" size={20} color="#8a8a8a" />
          </Pressable>
        </View>
      </View>

      <Text style={styles.walkMeta}>
        <Text style={styles.blueText}>
          {distanceText}, {durationText}
        </Text>
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
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
  topRightIcons: {
    flexDirection: "row",
  },
  circleIconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#dfe3de",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
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