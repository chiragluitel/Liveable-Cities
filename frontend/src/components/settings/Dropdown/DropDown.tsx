import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Modal, Button, Platform } from "react-native";
import DropDownLeft from "./DropDownLeft";
import DropDownItem from "./DropDownItem";

type DropDownProps = {
  title: string
  initialValue?: string
  hideSeperator?: boolean
}

export default function DropDown({title = "{title}", hideSeperator = false, initialValue}: DropDownProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue ? initialValue : "");

  function itemPressed(value: string) {
    setModalVisible(false);
    setSelectedValue(value);
    console.log(`Selected item: ${value}`);
  }

  return (
    <View style={hideSeperator ? styles.dropdownLast : styles.dropdown}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalCenter}>
          <View style={styles.content}>
            <Text>hi</Text>
            <DropDownItem title="Item 1" value="1" onPressFunc={itemPressed} />
            <DropDownItem title="Item 2" value="2" onPressFunc={itemPressed} />
            <DropDownItem title="Item 3" value="3" onPressFunc={itemPressed} />
            <DropDownItem title="Item 4" value="4" onPressFunc={itemPressed} />
          </View>
        </View>
      </Modal>

      <TouchableHighlight onPress={() => setModalVisible(true)} style={{borderRadius: 10}}>
        <View style={styles.button}>
          <Text style={{fontSize: 17}}>{title}</Text>
          <DropDownLeft selectedValue={selectedValue} />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    borderBottomColor: "#c7c7cc",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  dropdownLast: {
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
  modalCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "white",
    margin: 20,
    padding: 35,
    borderRadius: 20,
    shadowColor: Platform.OS === "ios" ? "black" : "#0000007f", // Make shadow lighter on Android
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.13,
    shadowRadius: 9.8,
    elevation: 8,
  }
});