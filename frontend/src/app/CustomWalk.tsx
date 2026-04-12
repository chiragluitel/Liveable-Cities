import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Switch, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useWalks } from '../context/SavedCustomWalks';

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

  //__WARNING BELOW until warning again is AI generated as i got stuck here______________
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
    };
    
    saveWalk(walkData); // Push object to global memory
    router.back(); // Navigate back to the dashboard
  };

  //WARNING AI generated unit here _________________________________________________

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Custom Walk Settings</Text>

        {/*Custom walk name*/}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter a name for the walk:</Text>
          <TextInput
            style={styles.textInput}
            value={cuswalkname}
            onChangeText={setcuswalk}
            placeholder="Park Walk"
          />
        </View>

        {/* Distance Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Walk Distance (km):</Text>
          <TextInput
            style={styles.textInput}
            value={distance}
            onChangeText={setDistance}
            keyboardType="numeric"
            placeholder="e.g., 5.5"
          />
        </View>

        <Text style={styles.sectionTitle}>Environmental Filters</Text>

        {/* Water Fountain Filter */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Water Fountain</Text>
          <Switch value={hasWaterFountain} onValueChange={setHasWaterFountain} />
        </View>

        

        {/* Disabled Toilets Filter */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Disabled Toilets</Text>
          <Switch value={hasDisabledToilets} onValueChange={setHasDisabledToilets} />
        </View>

        {/* Park Filter */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Park</Text>
          <Switch value={hasPark} onValueChange={setHasPark} />
        </View>

        {/* Playground Filter */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Playground</Text>
          <Switch value={hasPlayground} onValueChange={setHasPlayground} />
        </View>

        {/* Rubish Bins */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Rubbish Bins</Text>
          <Switch value={hasRubbishBin} onValueChange={setHasRubbishBin} />
        </View>

        {/* Off leash Dog Zones */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Off Leash Zones</Text>
          <Switch value={hasOffLeash} onValueChange={setHasOffLeash} />
        </View>



        

        {/* Saving the walk button*/}
                
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons name="save" size={24} color="#FFF" />
            <Text style={styles.saveButtonText}>Save Custom Walk</Text>
        </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D1D6',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 16,
    color: '#000',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2, 
  },
  switchLabel: {
    fontSize: 17,
    color: '#000',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#208b00', 
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

  saveButton: { flexDirection: 'row', 
    backgroundColor: '#208b00',
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 20, 
    marginBottom: 40 },

  saveButtonText: { color: '#FFF', 
    fontSize: 18, 
    fontWeight: '600', 
    marginLeft: 8 },
});
