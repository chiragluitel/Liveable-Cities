import React from 'react';
import { Text, SafeAreaView, ScrollView } from 'react-native';

import { useCustomWalks } from '../context/CustomWalkContext';
import AddCustomWalkButton from '../components/CustomWalk/AddCustomWalkButton';
import CustomWalkCard from '../components/CustomWalk/CustomWalkCard';


export default function Index() {
  const { walks, deleteWalk } = useCustomWalks();

  return (
    <SafeAreaView className="flex-1 bg-[#F2F2F7]">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-[28px] font-bold mb-6 text-black">My Custom Walks</Text>

        <AddCustomWalkButton />

        {walks.map((walk: any) => (
          <CustomWalkCard
            key={walk.id}
            walk={walk}
            onDelete={deleteWalk}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
