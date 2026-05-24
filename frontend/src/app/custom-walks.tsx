import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';

import { useCustomWalks } from '../context/CustomWalkContext';
import AddCustomWalkButton from '../components/CustomWalk/AddCustomWalkButton';
import CustomWalkCard from '../components/CustomWalk/CustomWalkCard';


export default function Index() {
  const { walks, deleteWalk } = useCustomWalks();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>My Custom Walks</Text>

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },

  container: {
    padding: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
});
