import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import WalkActionButton from './WalkActionButton';
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";

type Walk = {
  id: number;
  cuswalkname?: string;
  distance?: number;
};

type CustomWalkCardProps = {
  walk: Walk;
  onDelete: (id: number) => void;
  onPress?: () => void;
};

export default function CustomWalkCard({ walk, onDelete, onPress }: CustomWalkCardProps) {
  const { colorScheme } = useColorScheme();
  const isLight = colorScheme === "light";
  return (
    <TouchableOpacity className="bg-background-100 dark:bg-dark-background-300 p-4 rounded-xl mb-4 shadow" onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-text dark:text-dark-text">
          {walk.cuswalkname || 'Unnamed Walk'}
        </Text>

        <Text className="text-base text-text dark:text-dark-text-500">
          {walk.distance} km
        </Text>
      </View>

      <View className="flex-row justify-end border-t border-text-200 dark:border-dark-text-400 pt-3">
        <Link href={{ pathname: '/custom-walk' as any, params: { id: walk.id } }} asChild>
          <WalkActionButton
            iconName="pencil"
            label="Edit"
            color={isLight ? colours.accent.DEFAULT : colours.dark.accent[700]}
          />
        </Link>

        <WalkActionButton
          iconName="trash"
          label="Delete"
          color={isLight ? colours.warning.DEFAULT : colours.dark.warning[500]}
          onPress={() => onDelete(walk.id)}
        />
      </View>
    </TouchableOpacity>
  );
}
