import React from 'react'
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';

type InputFieldProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
};

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
}: InputFieldProps) {
  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-2 text-[#333]">{label}</Text>

      <TextInput
        className="border border-[#D1D1D6] p-[14px] rounded-[10px] bg-white text-base"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}
