import React from 'react';
import { View, Text, Switch } from 'react-native';
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
    <View className="flex-row items-center justify-between bg-background-100 dark:bg-dark-primary-200 py-3 px-4 rounded-[10px] mb-[10px] shadow-sm">
      <Text className="text-[17px] text-text dark:text-dark-text">{label}</Text>

      <SlideToggle value={value} onValueChange={onChange} />
    </View>
  );
}
