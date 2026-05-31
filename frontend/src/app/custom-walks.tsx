import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { useCustomWalks } from '../context/CustomWalkContext';
import AddCustomWalkButton from '../components/CustomWalk/AddCustomWalkButton';
import CustomWalkCard from '../components/CustomWalk/CustomWalkCard';
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Index() {
  const { walks, deleteWalk } = useCustomWalks();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background-50 dark:bg-dark-background-100">
      <ScrollView contentContainerStyle={{ padding: 20, top: insets.top + 50 }}>
        <Text className="text-[28px] font-bold mb-6 text-text dark:text-dark-text">My Custom Walks</Text>

        <AddCustomWalkButton />

        {walks.map((walk: any) => (
          <CustomWalkCard
            key={walk.id}
            walk={walk}
            onDelete={deleteWalk}
          />
        ))}
      </ScrollView>
    </View>
  );
}
