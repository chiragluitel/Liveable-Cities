import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type WalkActionButtonProps = {
  iconName: keyof typeof Ionicons.glyphMap;//Ensuring icon name is a valid icon name from "Ionicons"
  label: string;
  color: string;
  onPress?: () => void;
};

export default function WalkActionButton({
  iconName,
  label,
  color,
  onPress,
}: WalkActionButtonProps) {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Ionicons name={iconName} size={20} color={color} />
      <Text style={[styles.actionText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },

  actionText: {
    marginLeft: 4,
    fontSize: 15,
    fontWeight: '500',
  },
});