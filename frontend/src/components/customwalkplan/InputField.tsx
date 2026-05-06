import React from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';

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
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#D1D1D6',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
});