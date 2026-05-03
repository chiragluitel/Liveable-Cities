import React from "react";
import { StyleSheet, Text, View } from "react-native";

type SelectedWalkInfoSectionProps = {
  title: string;
  text: string;
};

export default function SelectedWalkInfoSection({
  title,
  text,
}: SelectedWalkInfoSectionProps) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    paddingTop: 6,
    paddingBottom: 12,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#222",
  },
});