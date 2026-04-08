import React, { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";

type SettingsGroupProps = {
  title: string
  children: ReactNode
}

export default function SettingsGroup({title="title", children}: SettingsGroupProps) {
  return (
    <View style={styles.group}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    width: "90%",
    paddingBottom: 10,
  },
  title: {
    fontSize: 13,
    color: "#8e8e93",
    padding: 8,
  },
  content: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
  },
});