import React from 'react';
import { View, Text, Switch } from 'react-native';

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
    <View className="flex-row items-center justify-between bg-white py-3 px-4 rounded-[10px] mb-[10px] shadow-sm">
      <Text className="text-[17px] text-black">{label}</Text>

      <Switch value={value} onValueChange={onChange} />
    </View>
  );
}
