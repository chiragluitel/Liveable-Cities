import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {
  backLabel: string;
  screenTitle: string;
};

export default function SelectedWalkHeader({
  backLabel,
  screenTitle,
}: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color="#111" />
        <Text style={styles.backText}>{backLabel}</Text>
      </Pressable>

      <Text style={styles.title}>{screenTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 18,
    left: 20,
    right: 20,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
  },
  backText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
});