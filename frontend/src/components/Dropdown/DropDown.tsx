import Ionicons from "@expo/vector-icons/Ionicons"
import React, { ReactNode, useRef, useState } from "react";
import { Modal, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

type DropDownProps = {
  title: string
  initialSelected: string
  hideSeperator?: boolean
  children: ReactNode
};

type Anchor = {
  x: number
  y: number
  width: number
  height: number
};

import { createContext, useContext } from "react";

type DropDownContextType = {
  itemPressed: (value: string) => void
  isSelected: (value: string) => boolean
};

const DropDownContext = createContext<DropDownContextType | null>(null);

export const useDropDownContext = () => {
  const ctx = useContext(DropDownContext);
  if (!ctx) throw new Error("useDropDownContext must be used within provider");
  return ctx;
};

export default function DropDown({
  title, 
  initialSelected, 
  hideSeperator = false, 
  children
}: DropDownProps) {
  const buttonRef = useRef<View | null>(null); 
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialSelected ? initialSelected : "");

  function itemPressed(value: string) {
    setModalVisible(false);
    setSelectedValue(value);
  }

  const isSelected = (value: string) => {
    return selectedValue === value
  }

  function getButtonPos() {
    if (!buttonRef.current) {
      return;
    }

    buttonRef.current.measure(
      (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        setAnchor({x: pageX, y: pageY, width, height});
      }
    );
  }

  return (
    <View className={`w-full bg-white rounded-[10] ${hideSeperator ? "" : "border-b-[#C7C7CC] border-b-hairline"}`}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          className="flex-1 items-center justify-center"
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
                className="bg-white m-[5] rounded-[20]"
                style={styles.contentShadow}
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}
              >
                <DropDownContext.Provider value={{itemPressed, isSelected}}>
                  {children}
                </DropDownContext.Provider>
              </ScrollView>
            </View>
          )}
        </TouchableOpacity>
      </Modal>

      <TouchableHighlight 
        onPress={() => {
            getButtonPos();
            setModalVisible(true);
        }} 
        className="rounded-[10]"
        underlayColor="#747480"
      >
        <View 
          className="flex-row justify-between bg-white rounded-[10] p-[15]" 
          ref={buttonRef}
        >
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
  contentShadow: {
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