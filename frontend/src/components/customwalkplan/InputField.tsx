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
    <View className='mb-[24]'>
      <Text className='text-base font-medium mb-[8] text-text-600 dark:text-dark-text-600'>{label}</Text>

      <TextInput
        className='border-hairline border-text-100 dark:border-dark-text-50 p-[14] rounded-[10] bg-background-100 dark:bg-dark-background-200 text-text dark:text-dark-text'
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}