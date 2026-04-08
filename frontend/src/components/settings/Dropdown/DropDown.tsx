import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Modal, Button } from "react-native";
import DropDownLeft from "./DropDownLeft";

type DropDownProps = {
  title: string
}

export default function DropDown({title = "title"}: DropDownProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.dropdown}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View>
          <Text>hi</Text>
          <Button onPress={() => setModalVisible(false)} title="close"/>
        </View>
      </Modal>

      <TouchableHighlight onPress={() => setModalVisible(true)} style={{borderRadius: 10}}>
        <View style={styles.button}>
          <Text style={{fontSize: 17}}>{title}</Text>
          <DropDownLeft />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15
  }
});