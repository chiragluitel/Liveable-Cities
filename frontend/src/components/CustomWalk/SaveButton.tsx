import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SaveButtonProps = {
  onPress: () => void;
  title: string;
};

export default function SaveButton({ onPress, title }: SaveButtonProps) {
  return (
    <TouchableOpacity className="flex-row bg-[#208b00] p-4 rounded-xl items-center justify-center mt-5 mb-10" onPress={onPress}>
      <Ionicons name="save" size={24} color="#FFF" />
      <Text className="text-white text-lg font-semibold ml-2">{title}</Text>
    </TouchableOpacity>
  );
}
