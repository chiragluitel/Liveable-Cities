import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { TouchableOpacity, Text, useWindowDimensions } from 'react-native';

type ZoomControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  animatedSheetPosition?: SharedValue<number>;
};

export default function ZoomControls({ onZoomIn, onZoomOut, animatedSheetPosition }: ZoomControlsProps) {
  const { height } = useWindowDimensions();

  const zoomInStyle = useAnimatedStyle(() => {
    const base = 184;
    if (animatedSheetPosition == null) return { bottom: base };
    return { bottom: Math.max(base, height - animatedSheetPosition.value + 68) };
  });

  const zoomOutStyle = useAnimatedStyle(() => {
    const base = 136;
    if (animatedSheetPosition == null) return { bottom: base };
    return { bottom: Math.max(base, height - animatedSheetPosition.value + 16) };
  });

  return (
    <>
      <Animated.View className="absolute right-4 w-11 h-11" style={zoomInStyle}>
        <TouchableOpacity
          className="w-11 h-11 bg-white rounded-lg items-center justify-center shadow-md"
          style={{ elevation: 4 }}
          onPress={onZoomIn}
        >
          <Text className="text-[22px] font-bold leading-[26px]">+</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View className="absolute right-4 w-11 h-11" style={zoomOutStyle}>
        <TouchableOpacity
          className="w-11 h-11 bg-white rounded-lg items-center justify-center shadow-md"
          style={{ elevation: 4 }}
          onPress={onZoomOut}
        >
          <Text className="text-[22px] font-bold leading-[26px]">−</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}
