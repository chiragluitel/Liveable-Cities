import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AddCustomWalkButton() {
  return (
    <Link href="./customwalkplanner/CustomWalk" asChild>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color="#FFF" />
        <Text style={styles.addButtonText}>Add Custom Walk</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});