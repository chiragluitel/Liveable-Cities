import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

type ToggleProps = {
  value: boolean,
  onValueChange: Function
}

export default function SlideToggle({value, onValueChange}: ToggleProps) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 16]
  });

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#7676801f", "#31C859"]
  });

  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <Animated.View style={[styles.track, {backgroundColor}]}>
        <Animated.View style={[styles.knob, { transform: [{translateX}]}]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 36,
    height: 22,
    borderRadius: 15,
    justifyContent: "center",
  },
  knob: {
    width: 18,
    height: 18,
    borderRadius: 13,
    backgroundColor: "white",
    position: "absolute",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2
  }
});