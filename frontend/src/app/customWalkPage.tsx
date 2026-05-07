import React from 'react';
import { StyleSheet, Text,  SafeAreaView, ScrollView } from 'react-native';

import { useWalks } from '../context/SavedCustomWalks';
import AddCustomWalkButton from '../components/customwalkplan/AddCustomWalkButton';
import SavedWalkCard from '../components/customwalkplan/SavedWalkCard';


export default function Index() {
  const { walks, deleteWalk } = useWalks();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>My Custom Walks</Text>

        <AddCustomWalkButton />

        {walks.map((walk: any) => (
          <SavedWalkCard
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