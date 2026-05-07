import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SelectedWalkActionRow() {
  return (
    <View style={styles.actionRow}>
      <Pressable style={styles.primaryAction}>
        <Ionicons name="navigate-circle-outline" size={22} color="#fff" />
        <Text style={styles.primaryActionText}>Start Walk</Text>
      </Pressable>

      <Pressable style={styles.secondaryAction}>
        <Ionicons name="download-outline" size={22} color="#111" />
        <Text style={styles.secondaryActionText}>Download</Text>
      </Pressable>

      <Pressable style={styles.secondaryAction}>
        <Ionicons name="ellipsis-horizontal" size={22} color="#111" />
        <Text style={styles.secondaryActionText}>More</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  primaryAction: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 18,
    paddingVertical: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  primaryActionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    marginTop: 8,
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: "#dcdedd",
    borderRadius: 18,
    paddingVertical: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  secondaryActionText: {
    color: "#111",
    fontWeight: "700",
    fontSize: 15,
    marginTop: 8,
  },
});