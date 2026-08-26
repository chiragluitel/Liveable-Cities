import Animated, { useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { TouchableOpacity, Text, useWindowDimensions } from 'react-native';

type ZoomControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  animatedSheetPosition?: SharedValue<number>;
};

export default function ZoomControls({ onZoomIn, onZoomOut, animatedSheetPosition }: ZoomControlsProps) {
  const { height } = useWindowDimensions();

  const opacity = useAnimatedStyle(() => {
    if (animatedSheetPosition == null) return { opacity: 1 };
    return {
      opacity: interpolate(
        animatedSheetPosition.value,
        [height * 0.55, height * 0.65],
        [0, 1],
        Extrapolation.CLAMP
      ),
    };
  });

  const zoomInStyle = useAnimatedStyle(() => {
    const base = 184;
    if (animatedSheetPosition == null) return { bottom: base };
    return { bottom: Math.max(base, height - animatedSheetPosition.value + 58) };
  });

  const zoomOutStyle = useAnimatedStyle(() => {
    const base = 136;
    if (animatedSheetPosition == null) return { bottom: base };
    return { bottom: Math.max(base, height - animatedSheetPosition.value + 6) };
  });

  return (
    <>
      <Animated.View className="absolute right-4 w-11 h-11" style={[zoomInStyle, opacity]}>
        <TouchableOpacity
          className="w-11 h-11 bg-background-200 dark:bg-dark-background-400 rounded-lg items-center justify-center shadow-md"
          style={{ elevation: 4 }}
          onPress={onZoomIn}
        >
          <Text className="text-[22px] font-bold leading-[26px] text-dark-text-200 dark:text-dark-text">+</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View className="absolute right-4 w-11 h-11" style={[zoomOutStyle, opacity]}>
        <TouchableOpacity
          className="w-11 h-11 bg-background-200 dark:bg-dark-background-400 rounded-lg items-center justify-center shadow-md"
          style={{ elevation: 4 }}
          onPress={onZoomOut}
        >
          <Text className="text-[22px] font-bold leading-[26px] text-dark-text-200 dark:text-dark-text">−</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}
