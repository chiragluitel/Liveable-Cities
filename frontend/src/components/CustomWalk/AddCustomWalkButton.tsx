import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AddCustomWalkButton() {
  return (
    <Link href={"/custom-walk" as any} asChild>
      <TouchableOpacity className="flex-row bg-[#007AFF] rounded-xl items-center justify-center mb-6 p-4">
        <Ionicons name="add" size={24} color="#FFF" />
        <Text className="text-white text-lg font-semibold ml-2">Add Custom Walk</Text>
      </TouchableOpacity>
    </Link>
  );
}
