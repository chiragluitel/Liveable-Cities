import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';
import WalkActionButton from './WalkActionButton';
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";

type Walk = {
  id: string;
  cuswalkname?: string;
  distance?: string;
};

type SavedWalkCardProps = {
  walk: Walk;
  onDelete: (id: string) => void;
};

export default function SavedWalkCard({ walk, onDelete }: SavedWalkCardProps) {
  const { colorScheme } = useColorScheme();
	const isLight = colorScheme === "light";
  
  return (
    <View style={styles.cardShadow} className="bg-background-100 dark:bg-dark-background-300 p-[16] rounded-[12] mb-[16]">
      <View className="flex-row justify-between items-center mb-[16]">
        <Text className='text-lg font-semibold text-text dark:text-dark-text'>
          {walk.cuswalkname || 'Unnamed Walk'}
        </Text>

        <Text className="text-base text-text dark:text-dark-text-500">
          {walk.distance} km
        </Text>
      </View>

      <View className='flex-row justify-end border-t-hairline border-t-text-200 dark:border-t-dark-text-400'>
        <Link href={{ pathname: './customwalkplanner/CustomWalk', params: { id: walk.id } }} asChild>
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
    </View>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});