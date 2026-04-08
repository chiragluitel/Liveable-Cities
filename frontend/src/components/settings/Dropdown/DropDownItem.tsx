import React from "react";
import { View, TouchableHighlight, StyleSheet, Text, Image } from "react-native";
//@ts-ignore
import checkArrow from "@/assets/settings/check-solid.png"

export type ItemProps = {
  title: string
  value: string
  isSelected?: boolean
  onPressFunc?: Function
  hideSeperator?: boolean
}

export default function DropDownItem({title = "{title}", value, isSelected = false, onPressFunc = () => {}, hideSeperator= false}: ItemProps) {

  return (
    <TouchableHighlight 
      onPress={() => onPressFunc(value)}
    >
      <View style={hideSeperator ? styles.buttonLast : styles.button}>
        <Text style={{fontSize: 17}}>{title}</Text>
        <Image style={[styles.checkImg, {opacity: isSelected ? 1 : 0}]} source={checkArrow}/>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 15,
    paddingLeft: 20,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 15,
    paddingLeft: 20,
  },
  checkImg: {
    height: 22, 
    width: 22, 
  }
});