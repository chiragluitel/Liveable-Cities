import React, { useState, ReactNode, ReactElement } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"
import { useRouter } from "expo-router";


type SubPageProps = {
  title: string
  navigateFunc: Function
  hideSeperator?: boolean
}

export default function SettingsSubPage({
  title = "{title}", 
  navigateFunc,
  hideSeperator = false, 
}: SubPageProps) {
  const router = useRouter();

  return (
    <View style={hideSeperator ? styles.settingRowLast : styles.settingRow}>
      <TouchableHighlight
        onPress={() => navigateFunc()}
        style={{borderRadius: 10}}
        underlayColor="#747480"
      >
        <View style={styles.button}>
          <Text style={{fontSize: 17}}>{title}</Text>
          <Ionicons name="chevron-forward" size={17} color="#8e8e93" />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  settingRow: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    borderBottomColor: "#c7c7cc",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  settingRowLast: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15
  },
});