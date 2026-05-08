import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useWalks } from '../../../context/SavedCustomWalks';

import InputField from '@/src/components/customwalkplan/InputField';
import FilterSwitch from '@/src/components/customwalkplan/FilterSwitch';
import SaveButton from '@/src/components/customwalkplan/SaveButton';

export default function WalkPlannerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { saveWalk, walks } = useWalks(); //Connects to global walks state

  // State initialization 
  const [distance, setDistance] = useState('');
  const [cuswalkname, setcuswalk] = useState('');
  const [hasWaterFountain, setHasWaterFountain] = useState(false);
  const [hasDisabledToilets, setHasDisabledToilets] = useState(false);
  const [hasPark, setHasPark] = useState(false);
  const [hasPlayground, setHasPlayground] = useState(false);
  const [hasWellLitStreets, setHasWellLitStreets] = useState(false);
  const [hasRubbishBin, setHasRubbishBin] = useState(false)
  const [hasOffLeash, setHasOffLeash] = useState(false)

  // If routing parameters contain an 'id', we are editing. Hydrate the local state.
  useEffect(() => {
    if (params.id) {
      const existingWalk = walks.find((w: any) => w.id === params.id);
      if (existingWalk) {
        setcuswalk(existingWalk.cuswalkname);
        setDistance(existingWalk.distance);
        setHasWaterFountain(existingWalk.hasWaterFountain);
        setHasDisabledToilets(existingWalk.hasDisabledToilets);
        setHasPark(existingWalk.hasPark);
        setHasPlayground(existingWalk.hasPlayground);
        setHasWellLitStreets(existingWalk.hasWellLitStreets);
        setHasRubbishBin(existingWalk.hasRubbishbin);
        setHasOffLeash(existingWalk.hasOffLeash);
      }
    }
  }, [params.id, walks]);

  const handleSave = () => {
    // Package all state variables into a single data object
    const walkData = {
      id: params.id, // Will be undefined if creating a new walk
      cuswalkname,
      distance,
      hasWaterFountain,
      hasDisabledToilets,
      hasPark,
      hasPlayground,
      hasWellLitStreets,
      hasRubbishBin,
      hasOffLeash,
    };
    
    saveWalk(walkData); // Push object to global memory
    router.back(); // Navigate back to the dashboard
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Custom Walk Settings</Text>

        <InputField
          label="Enter a name for the walk:"
          value={cuswalkname}
          onChangeText={setcuswalk}
          placeholder="Park Walk"
        />

        {/* Distance Input */}
        <InputField
          label="Select a distance range for your walk (km): "
          value={distance}
          onChangeText={setDistance}
          keyboardType="numeric"
          placeholder='1 - 5'
        
        />

        <Text style={styles.sectionTitle}>Environmental Filters</Text>

        {/* Water Fountain Filter */}
        <FilterSwitch
          label="Water Fountain"
          value={hasWaterFountain}
          onChange={setHasWaterFountain}
        />

        {/* Disabled Toilets Filter */}
        <FilterSwitch
          label="Disabled Toilets"
          value={hasDisabledToilets}
          onChange={setHasDisabledToilets}
        />

        {/* Park Filter */}
        <FilterSwitch
          label="Park"
          value={hasPark}
          onChange={setHasPark}
        />

        {/* Playground Filter */}
        <FilterSwitch
          label="Playground"
          value={hasPlayground}
          onChange={setHasPlayground}
        />

        {/* Rubish Bins */}
        <FilterSwitch
          label="Rubbish Bins"
          value={hasRubbishBin}
          onChange={setHasRubbishBin}
        />

        {/* Off leash Dog Zones */}
        <FilterSwitch
          label="Off Leash Zones"
          value={hasOffLeash}
          onChange={setHasOffLeash}
        />
        {/* Well lit streets */}
        <FilterSwitch
          label="Well Lit Streets"
          value={hasWellLitStreets}
          onChange={setHasWellLitStreets}
        />

        {/* Saving the walk button*/}
        <SaveButton title='Save Custom Walk' onPress={handleSave} />

      </ScrollView>

    </SafeAreaView>
  );
}

// StyleSheet architecture for consistent rendering
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7', // Standard iOS system background color
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 16,
    color: '#000',
  },
});
