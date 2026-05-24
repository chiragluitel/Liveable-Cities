import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";

type ToggleProps = {
  value: boolean,
  onValueChange: (value: boolean) => void
};

const knobShadow = {
  shadowColor: "black",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 3,
  elevation: 2,
};

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
      <Animated.View
        className="w-[36] h-[22] rounded-[15] justify-center"
        style={{backgroundColor}}
      >
        <Animated.View
          className="w-[18] h-[18] rounded-[13] bg-white absolute"
          style={[knobShadow, { transform: [{translateX}]}]}
        />
      </Animated.View>
    </Pressable>
  );
}
