import React from "react";
import { StyleSheet, Text, View } from "react-native";

type SelectedWalkInfoSectionProps = {
  title: string;
  text: string;
  selectedFilters?: string[];
};

export default function SelectedWalkInfoSection({
  title,
  text,
  selectedFilters,
}: SelectedWalkInfoSectionProps) {
  const hasSelectedFilters = selectedFilters && selectedFilters.length > 0;

  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoText}>{text}</Text>

      {hasSelectedFilters && (
        <View style={styles.filterTagContainer}>
          {selectedFilters.map((filter) => (
            <View key={filter} style={styles.filterTag}>
              <Text style={styles.filterTagText}>{filter}</Text>
            </View>
          ))}
        </View>
      )}
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
  filterTagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 14,
  },
  filterTag: {
    backgroundColor: "#d7d7db",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  filterTagText: {
    color: "#111",
    fontSize: 13,
    fontWeight: "600",
  },
});