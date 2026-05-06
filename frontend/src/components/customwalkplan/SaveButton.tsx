import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SaveButtonProps = {
  onPress: () => void;
  title: string;
};

export default function SaveButton({ onPress, title }: SaveButtonProps) {
  return (
    <TouchableOpacity style={styles.saveButton} onPress={onPress}>
      <Ionicons name="save" size={24} color="#FFF" />
      <Text style={styles.saveButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#208b00',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },

  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});