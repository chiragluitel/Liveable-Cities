import Ionicons from "@expo/vector-icons/Ionicons"
import React, { ReactNode, useRef, useState } from "react";
import { Modal, Platform, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import useAsyncStorage from "@Hooks/useAsyncStorage";
import { colours } from "@Theme/colours";
import { useColorScheme } from "nativewind";

type DropdownProps = {
  title: string
  initialSelected: string
  actionFunc: (value: string) => void
  hideSeperator?: boolean
  onValueChange?: (value: string) => void
  children: ReactNode
};

type Anchor = {
  x: number
  y: number
  width: number
  height: number
};

import { createContext, useContext } from "react";

type DropdownContextType = {
  itemPressed: (value: string) => void
  isSelected: (value: string) => boolean
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("useDropdownContext must be used within provider");
  return ctx;
};

const dropdownShadow = {
  shadowColor: Platform.OS === "ios" ? "black" : "#0000007f",
  shadowOffset: { width: 5, height: 5 },
  shadowOpacity: 0.13,
  shadowRadius: 9.8,
  elevation: 8,
};

export default function Dropdown({
  title,
  initialSelected,
  actionFunc,
  hideSeperator = false,
  children
}: DropdownProps) {
  const buttonRef = useRef<View | null>(null);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [selectedValue, setSelectedValue] = useAsyncStorage(title, initialSelected ? initialSelected : "");

  const { colorScheme } = useColorScheme();
  
  const isLight = colorScheme === "light";

  function itemPressed(value: string) {
    setModalVisible(false);
    setSelectedValue(value);
    actionFunc(value);
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
    <View className={`w-full bg-background-100 dark:bg-dark-background-100 rounded-[10] 
    ${hideSeperator ? "" : "border-b-text-200 dark:border-b-dark-text-400 border-b-hairline"}`}>
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
                className="bg-background-100 dark:bg-dark-background-100 m-[5] rounded-[20]"
                style={dropdownShadow}
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}
              >
                <DropdownContext.Provider value={{itemPressed, isSelected}}>
                  {children}
                </DropdownContext.Provider>
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
        underlayColor={isLight ? colours.background[400] : colours.dark.background[50]}
      >
        <View
          className="flex-row justify-between bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]"
          ref={buttonRef}
        >
          <Text className="text-text dark:text-dark-text text-[17px]">{title}</Text>
          <View className="flex-row items-center">
            <Text className="text-accent-600 dark:text-dark-accent-700 text-[17px]">
              {selectedValue}
            </Text>
            <Ionicons name="chevron-expand" size={17} color={isLight ? colours.primary[700] : colours.dark.primary[300]} />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}
