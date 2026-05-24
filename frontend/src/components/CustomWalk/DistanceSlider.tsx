import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.valueText}>{value} km</Text>

      <Slider
        style={styles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#208b00"
        maximumTrackTintColor="#D1D1D6"
        thumbTintColor="#208b00"
      />

      <View style={styles.rangeLabels}>
        <Text style={styles.rangeText}>{minimumValue} km</Text>
        <Text style={styles.rangeText}>{maximumValue} km</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },

  valueText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },

  slider: {
    width: '100%',
    height: 40,
  },

  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rangeText: {
    fontSize: 14,
    color: '#666',
  },
});