import Ionicons from "@expo/vector-icons/Ionicons"
import React, { ReactElement, ReactNode, useRef, useState } from "react";
import { Modal, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { ItemProps } from "./DropDownItem";
import useAsyncStorage from "@Hooks/useAsyncStorage";
import { colors } from "@Theme/colours";
import { useColorScheme } from "nativewind";

type DropDownProps = {
  title: string
  initialSelected: string
  actionFunc: (value: string) => void
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
  title, 
  initialSelected, 
  actionFunc,
  hideSeperator = false, 
  children
}: DropDownProps) {
  const buttonRef = useRef<View | null>(null); 
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  //const [selectedValue, setSelectedValue] = useState(initialSelected ? initialSelected : "");
  const [selectedValue, setSelectedValue] = useAsyncStorage(title, initialSelected ? initialSelected : "");

  const { colorScheme } = useColorScheme();
  
  const isLight = colorScheme === "light";

  function itemPressed(value: string) {
    setModalVisible(false);
    setSelectedValue(value);
    actionFunc(value);
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
                style={styles.contentShadow}
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
        onPress={() => {
            getButtonPos();
            setModalVisible(true);
        }} 
        className="rounded-[10]"
        underlayColor={isLight ? colors.background[400] : colors.dark.background[50]}
      >
        <View 
          className="flex-row justify-between bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]" 
          ref={buttonRef}
        >
          <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">{title}</Text>
          <View className="flex-row items-center">
            <Text style={{fontSize: 17}}  className="text-accent-400 dark:text-dark-accent-700">
              {selectedValue}
            </Text>
            <Ionicons name="chevron-expand" size={17} color={isLight ? colors.primary[700] : colors.dark.primary[300]} />
          </View>
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