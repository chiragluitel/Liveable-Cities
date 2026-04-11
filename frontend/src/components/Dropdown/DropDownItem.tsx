import React from "react";
import { View, TouchableHighlight, StyleSheet, Text, Image } from "react-native";
import Entypo from "@expo/vector-icons/Entypo"

export type ItemProps = {
  title: string
  value: string
  isSelected?: boolean
  onPressFunc?: Function
  hideSeperator?: boolean
}

export default function DropDownItem({
  title = "{title}", 
  value, 
  isSelected = false, 
  onPressFunc = () => {}, 
  hideSeperator= false
}: ItemProps) {

  return (
    <TouchableHighlight 
      onPress={() => onPressFunc(value)}
      underlayColor="#747480"
    >
      <View style={hideSeperator ? styles.buttonLast : styles.button}>
        <Text style={{fontSize: 17}}>
          {title} 
        </Text>
        <Entypo name="check" size={20} color={"#007bfe"} style={{opacity: isSelected ? 1 : 0}} />
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