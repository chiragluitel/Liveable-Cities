import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
// @ts-ignore
import dropdownArrow from "@/assets/settings/chevron-down-solid.png" 

type DropDownProps = {
  selectedValue: string,
}

export default function DropDownLeft({selectedValue = "{value}"}: DropDownProps) {
  return (
    <View style={styles.left}>
      <Text style={{fontSize: 17, color: "#8e8e93"}}>{selectedValue}</Text>
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
    top: 3,
    left: 6,
  }
});