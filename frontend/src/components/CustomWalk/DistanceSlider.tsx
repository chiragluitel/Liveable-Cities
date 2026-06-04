import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { useColorScheme } from 'nativewind';
import { colours } from '@/src/theme/colours';

type DistanceSliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
};

export default function DistanceSlider({
  label,
  value,
  onChange,
  minimumValue = 1,
  maximumValue = 10,
  step = 1,
}: DistanceSliderProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-2 text-text-600 dark:text-dark-text-600">{label}</Text>

      <Text className="text-lg font-semibold text-text dark:text-dark-text mb-2">{value} km</Text>

      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={colorScheme === "light" ? colours.accent[400] : colours.dark.accent[300]}
        maximumTrackTintColor={colorScheme === "light" ? colours.accent[400] : colours.dark.accent[300]}
        thumbTintColor={colorScheme === "light" ? colours.primary[300] : colours.dark.primary[800]}
      />

      <View className="flex-row justify-between">
        <Text className="text-sm text-text-600 dark:text-dark-text-600">{minimumValue} km</Text>
        <Text className="text-sm text-text-600 dark:text-dark-text-600">{maximumValue} km</Text>
      </View>
    </View>
  );
}
