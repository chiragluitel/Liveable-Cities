import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import WalkActionButton from './WalkActionButton';

type Walk = {
  id: string;
  cuswalkname?: string;
  distance?: string;
};

type CustomWalkCardProps = {
  walk: Walk;
  onDelete: (id: string) => void;
  onPress?: () => void;
};

export default function CustomWalkCard({ walk, onDelete, onPress }: CustomWalkCardProps) {
  return (
    <TouchableOpacity className="bg-white p-4 rounded-xl mb-4 shadow" onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-black">
          {walk.cuswalkname || 'Unnamed Walk'}
        </Text>

        <Text className="text-base text-[#666]">
          {walk.distance} km
        </Text>
      </View>

      <View className="flex-row justify-end border-t border-[#F0F0F0] pt-3">
        <Link href={{ pathname: '/custom-walk' as any, params: { id: walk.id } }} asChild>
          <WalkActionButton
            iconName="pencil"
            label="Edit"
            color="#007AFF"
          />
        </Link>

        <WalkActionButton
          iconName="trash"
          label="Delete"
          color="#FF3B30"
          onPress={() => onDelete(walk.id)}
        />
      </View>
    </TouchableOpacity>
  );
}
