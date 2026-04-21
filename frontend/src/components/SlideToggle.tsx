import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { colors } from "@Theme/colours";
import { useColorScheme } from "nativewind";

type ToggleProps = {
  value: boolean,
  onValueChange: (value: boolean) => void
};

export default function SlideToggle({value, onValueChange}: ToggleProps) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const { colorScheme } = useColorScheme();
  
  const isLight = colorScheme === "light";

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
    outputRange: [
      isLight ? colors.background[200] : colors.dark.background[200], 
      isLight ? colors.accent[400] : colors.dark.accent[400]
    ]
  });

  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <Animated.View 
        className="w-[36] h-[22] rounded-[15] justify-center" 
        style={{backgroundColor}}
      >
        <Animated.View 
          className="w-[18] h-[18] rounded-[13] bg-white absolute" 
          style={[styles.shadow, { transform: [{translateX}]}]} 
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    shadow: {
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