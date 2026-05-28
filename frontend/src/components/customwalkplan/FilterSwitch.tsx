import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import SlideToggle from '../SlideToggle';

type FilterSwitchProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function FilterSwitch({
  label,
  value,
  onChange,
}: FilterSwitchProps) {
  return (
    <View style={styles.switchContainerShadow} className='flex-row items-center justify-between bg-background-100 dark:bg-dark-primary-200 py-[12] px-[16] rounded-[10] mb-[10]'>
      <Text className='text-lg text-text dark:text-dark-text'>{label}</Text>

      <SlideToggle value={value} onValueChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainerShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});