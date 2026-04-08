import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import dropdownArrow from "@/assets/settings/dropdown-arrow.png"

export default function DropDownLeft() {
  return (
    <View style={styles.left}>
      <Text style={{fontSize: 17, color: "#8e8e93"}}>value</Text>
      <Image style={styles.arrowImg} source={dropdownArrow}/>
    </View>
  );
}

const styles = StyleSheet.create({
  left: {
    flexDirection: "row"
  },
  arrowImg: {
    height: 19, 
    width: 19, 
    marginTop: 5, 
    marginLeft: 6
  }
});