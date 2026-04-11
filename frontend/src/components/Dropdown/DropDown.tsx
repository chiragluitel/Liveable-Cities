import Ionicons from "@expo/vector-icons/Ionicons"
import React, { ReactElement, ReactNode, useRef, useState } from "react";
import { Modal, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { ItemProps } from "./DropDownItem";

type DropDownProps = {
  title: string
  initialSelected?: string
  hideSeperator?: boolean
  children: ReactNode
};

type Anchor = {
  x: number
  y: number
  width: number
  height: number
};

export default function DropDown({
  title = "{title}", 
  hideSeperator = false, 
  initialSelected, 
  children
}: DropDownProps) {
  //@ts-ignore
  const buttonRef = useRef<TouchableHighlight | null>(null); 
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialSelected ? initialSelected : "");

  function itemPressed(value: string) {
    setModalVisible(false);
    setSelectedValue(value);
  }

  function getButtonPos() {
    if (!buttonRef.current) {
      return;
    }

    buttonRef.current.measure(
      (
        x: number, 
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
      ) => {
        setAnchor({
          x: pageX,
          y: pageY,
          width,
          height,
        });
      }
    );
  }

  // Update dropdown items with onPressFunc and selection state
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if ((child as ReactElement<ItemProps>).props.value === selectedValue) {
      return React.cloneElement(child as ReactElement<ItemProps>, {
        onPressFunc: itemPressed,
        isSelected: true,
      });
    } else {
      return React.cloneElement(child as ReactElement<ItemProps>, {
        onPressFunc: itemPressed,
        isSelected: false,
      });
    }
  });

  return (
    <View style={hideSeperator ? styles.settingRowNoSep : styles.settingRow}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          { anchor && (
            <View 
              style={{
                position: "absolute",
                left: anchor.x,
                top: anchor.y - 30,
                maxHeight: 250,
                width: "85%",
              }}
            >
              <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}
              >
                {enhancedChildren}
              </ScrollView>
            </View>
          )}
        </TouchableOpacity>
      </Modal>

      <TouchableHighlight 
        ref={buttonRef}
        onPress={() => {
            getButtonPos();
            setModalVisible(true);
        }} 
        style={{borderRadius: 10}}
        underlayColor="#747480"
      >
        <View style={styles.button}>
          <Text style={{fontSize: 17}}>{title}</Text>
          <Text style={{fontSize: 17, color: "#8e8e93"}}>
            {selectedValue} <Ionicons name="chevron-expand" size={17} />
          </Text>
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
  settingRowNoSep: {
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
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "white",
    margin: 5,
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