import Animated, { useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { TouchableOpacity, Text, useWindowDimensions } from 'react-native';

type RecentreButtonProps = {
  onRecentrePress: () => void;
  animatedSheetPosition?: SharedValue<number>;
};

export default function RecentreButton({ onRecentrePress, animatedSheetPosition }: RecentreButtonProps) {
  const { height } = useWindowDimensions();

  const animStyle = useAnimatedStyle(() => {
    const base = 120;
    if (animatedSheetPosition == null) return { bottom: base, opacity: 1 };
    const opacity = interpolate(
      animatedSheetPosition.value,
      [height * 0.55, height * 0.65],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { bottom: Math.max(base, height - animatedSheetPosition.value + 6), opacity };
  });

  return (
    <Animated.View className="absolute left-4" style={animStyle}>
      <TouchableOpacity
        className="py-[10px] px-4 bg-background-200 dark:bg-dark-background-400 rounded-lg shadow-md"
        onPress={onRecentrePress}
      >
        <Text className="font-semibold text-sm text-dark-text-200 dark:text-dark-text">Recentre</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
