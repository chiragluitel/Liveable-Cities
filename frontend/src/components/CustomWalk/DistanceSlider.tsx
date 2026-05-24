import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

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
  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-2 text-[#333]">{label}</Text>

      <Text className="text-lg font-semibold text-black mb-2">{value} km</Text>

      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#208b00"
        maximumTrackTintColor="#D1D1D6"
        thumbTintColor="#208b00"
      />

      <View className="flex-row justify-between">
        <Text className="text-sm text-[#666]">{minimumValue} km</Text>
        <Text className="text-sm text-[#666]">{maximumValue} km</Text>
      </View>
    </View>
  );
}
