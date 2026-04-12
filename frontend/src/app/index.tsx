import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>My Custom Walks</Text>

        {/* The Link component routes the user to the frontend/src/app/planner.tsx file */}
        <Link href="/CustomWalk" asChild>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#FFF" />
            <Text style={styles.addButtonText}>Add Custom Walk</Text>
          </TouchableOpacity>
        </Link>

        {/* Future location for rendering the Array of saved walk objects */}

      </View>
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
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF', 
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});