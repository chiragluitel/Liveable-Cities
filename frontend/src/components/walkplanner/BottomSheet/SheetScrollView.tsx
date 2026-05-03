import React from "react";
import { ScrollViewProps } from "react-native";
import Animated from "react-native-reanimated";

export const SheetScrollView = React.forwardRef<Animated.ScrollView,ScrollViewProps & { children?: React.ReactNode }>(({ children, onScroll, ...rest }, ref) => {
  return (
    <Animated.ScrollView
      ref={ref}
      {...rest}
      scrollEventThrottle={16}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </Animated.ScrollView>
  );
});