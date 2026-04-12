import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Switch, SafeAreaView, ScrollView } from 'react-native';

export default function WalkPlannerScreen() {
  // State initialization 
  const [distance, setDistance] = useState('');
  const [cuswalkname, setcuswalk] = useState('');
  const [hasWaterFountain, setHasWaterFountain] = useState(false);
  const [hasDisabledToilets, setHasDisabledToilets] = useState(false);
  const [hasPark, setHasPark] = useState(false);
  const [hasPlayground, setHasPlayground] = useState(false);
  const [hasWellLitStreets, setHasWellLitStreets] = useState(false);

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
            onChangeText={setDistance}
            keyboardType="numeric"
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

        {/* Well Lit Streets Filter */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Well Lit Streets</Text>
          <Switch value={hasWellLitStreets} onValueChange={setHasWellLitStreets} />
        </View>

        {/* Saving the walk button*/}
        <View

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
    elevation: 2, // Shadow equivalent for Android
  },
  switchLabel: {
    fontSize: 17,
    color: '#000',
  },
});