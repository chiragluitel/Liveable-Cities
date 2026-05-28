import React from 'react';
import { StyleSheet, Text,  View, ScrollView, TouchableOpacity } from 'react-native';

import { useWalks } from '../context/SavedCustomWalks';
import AddCustomWalkButton from '../components/customwalkplan/AddCustomWalkButton';
import SavedWalkCard from '../components/customwalkplan/SavedWalkCard';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, Stack } from "expo-router";


export default function Index() {
  const { walks, deleteWalk } = useWalks();
  const router = useRouter();
	const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background-50 dark:bg-dark-background-100">
      <Stack.Screen options={{headerShown: false}} />

      <ScrollView contentContainerStyle={{padding: 20, top: insets.top + 50}}>
        <Text className='text-3xl font-bold mb-[24] text-text dark:text-dark-text'>My Custom Walks</Text>

        <AddCustomWalkButton />

        {walks.map((walk: any) => (
          <SavedWalkCard
            key={walk.id}
            walk={walk}
            onDelete={deleteWalk}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.backBtnShadown, { top: insets.top + 12 }]}
        onPress={() => router.back()}
        className="absolute left-[16] py-[8] px-[14] bg-background-200 dark:bg-dark-background-400 rounded-[8]"
      >
        <Text className="text-base font-semibold text-dark-text-200 dark:text-dark-text">‹ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backBtnShadown: {
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 4,
	}
});