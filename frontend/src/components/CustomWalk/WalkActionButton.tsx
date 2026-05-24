import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type WalkActionButtonProps = {
  iconName: keyof typeof Ionicons.glyphMap;
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
    <TouchableOpacity className="flex-row items-center ml-4" onPress={onPress}>
      <Ionicons name={iconName} size={20} color={color} />
      <Text className="ml-1 text-[15px] font-medium" style={{ color }}>{label}</Text>
    </TouchableOpacity>
  );
}
