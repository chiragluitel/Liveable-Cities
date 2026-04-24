import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SelectedWalkImageGallery() {
  return (
    <View style={styles.galleryRow}>
      <View style={styles.galleryImage}>
        <Text style={styles.galleryText}>Image 1</Text>
      </View>

      <View style={styles.galleryImage}>
        <Text style={styles.galleryText}>Image 2</Text>
      </View>

      <View style={styles.galleryImageNarrow}>
        <Text style={styles.galleryText}>Image 3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  galleryRow: {
    flexDirection: "row",
    marginBottom: 18,
  },
  galleryImage: {
    flex: 1,
    height: 150,
    borderRadius: 16,
    backgroundColor: "#cfcfcf",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  galleryImageNarrow: {
    width: 70,
    height: 150,
    borderRadius: 16,
    backgroundColor: "#cfcfcf",
    justifyContent: "center",
    alignItems: "center",
  },
  galleryText: {
    color: "#666",
    fontSize: 14,
  },
});