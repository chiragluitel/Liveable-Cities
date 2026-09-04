import React, { useState, useEffect } from 'react';
import { Alert, Text, ScrollView, TouchableOpacity, View, Modal } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useCustomWalks } from '../../../context/CustomWalkContext';

import InputField from '@/src/components/CustomWalk/InputField';
import FilterSwitch from '@/src/components/CustomWalk/FilterSwitch';
import SaveButton from '@/src/components/CustomWalk/SaveButton';
import DistanceSlider from '@/src/components/CustomWalk/DistanceSlider';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from 'nativewind';
import { colours } from '@/src/theme/colours';
import { Filter } from 'bad-words';
import { useSettings } from '@/src/context/SettingsContext';
import ConfirmBox from '@/src/components/ConfirmBox';

const CUSTOM_WALK_API_URL = 'http://10.0.2.2:5050/api/custom-walk-route';

const DEFAULT_START_LOCATION = {
  lat: -38.0267,
  lng: 145.2940,
};

export default function WalkPlannerScreen() {
  const insets = useSafeAreaInsets();

  const router = useRouter();
  const params = useLocalSearchParams();
  const { saveWalk, walks } = useCustomWalks();

  const [distance, setDistance] = useState(1);
  const [cuswalkname, setcuswalk] = useState('');
  const [hasWaterFountain, setHasWaterFountain] = useState(false);
  const [hasDisabledToilets, setHasDisabledToilets] = useState(false);
  const [hasPark, setHasPark] = useState(false);
  const [hasPlayground, setHasPlayground] = useState(false);
  const [hasWellLitStreets, setHasWellLitStreets] = useState(false);
  const [hasRubbishBin, setHasRubbishBin] = useState(false);
  const [hasOffLeash, setHasOffLeash] = useState(false);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const { reducedMotion } = useSettings();

  useEffect(() => {
    if (params.id) {
      const existingWalk = walks.find((w: any) => w.id === params.id);

      if (existingWalk) {
        setcuswalk(existingWalk.cuswalkname);
        setDistance(Number(existingWalk.distance) || 1);
        setHasWaterFountain(Boolean(existingWalk.hasWaterFountain));
        setHasDisabledToilets(Boolean(existingWalk.hasDisabledToilets));
        setHasPark(Boolean(existingWalk.hasPark));
        setHasPlayground(Boolean(existingWalk.hasPlayground));
        setHasWellLitStreets(Boolean(existingWalk.hasWellLitStreets));
        setHasRubbishBin(Boolean(existingWalk.hasRubbishBin ?? existingWalk.hasRubbishbin));
        setHasOffLeash(Boolean(existingWalk.hasOffLeash));
      }
    }
  }, [params.id, walks]);

  const handleSave = async () => {
    const filter = new Filter();

    if (filter.isProfane(cuswalkname)) {
      setConfirmVisible(true);
      return;
    }

    const selectedFilters = [
      hasWaterFountain ? 'Water Fountain' : null,
      hasDisabledToilets ? 'Disabled Toilets' : null,
      hasPark ? 'Park' : null,
      hasPlayground ? 'Playground' : null,
      hasRubbishBin ? 'Rubbish Bins' : null,
      hasOffLeash ? 'Off Leash Zones' : null,
      hasWellLitStreets ? 'Well Lit Streets' : null,
    ].filter((filter): filter is string => Boolean(filter));

    try {
      const response = await fetch(CUSTOM_WALK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: cuswalkname || 'Custom Walk',
          targetDistanceKm: distance,
          selectedFilters,
          start: DEFAULT_START_LOCATION,
          waypoints: [],
        }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText || 'Could not create custom walk route.');
      }

      const routeResult = JSON.parse(responseText);

      console.log('Custom walk route created:', {
        distanceText: routeResult.distanceText,
        durationText: routeResult.durationText,
        attemptsUsed: routeResult.attemptsUsed,
        usedNativeRoundTrip: routeResult.usedNativeRoundTrip,
      });

      const walkData = {
        id: params.id,
        cuswalkname: cuswalkname || 'Custom Walk',
        distance,
        hasWaterFountain,
        hasDisabledToilets,
        hasPark,
        hasPlayground,
        hasWellLitStreets,
        hasRubbishBin,
        hasOffLeash,
        selectedFilters,
        routeDistanceMeters: routeResult.distanceMeters,
        routeDurationSeconds: routeResult.durationSeconds,
        routeDistanceText: routeResult.distanceText,
        routeDurationText: routeResult.durationText,
        attemptsUsed: routeResult.attemptsUsed,
        usedNativeRoundTrip: routeResult.usedNativeRoundTrip,
        routeGeoJson: routeResult.routeGeoJson,
      };

      saveWalk(walkData);
      router.back();
    } catch (error) {
      console.error('Failed to create custom walk route:', error);

      Alert.alert(
        'Route Error',
        'The app could not create the custom walk route. Please check that the backend is running and try again.'
      );
    }
  };

  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 bg-background-50 dark:bg-dark-background-100">
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ paddingTop: insets.top + 8 }} className="flex-row justify-start px-4 pb-3">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-1.5 py-2 px-3 rounded-full bg-accent-200 dark:bg-dark-accent active:opacity-70">
          <ChevronLeft size={16} color={colorScheme === "light" ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
          <Text className="text-sm font-semibold text-text dark:text-dark-text pr-2">Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-[28px] font-bold mb-6 text-text dark:text-dark-text">Custom Walk Settings</Text>

        <InputField
          label="Enter a name for the walk:"
          value={cuswalkname}
          onChangeText={setcuswalk}
          placeholder="Park Walk"
        />

        <DistanceSlider
          label="Select a distance for your walk:"
          value={distance}
          onChange={setDistance}
          minimumValue={1}
          maximumValue={10}
          step={1}
        />

        <Text className="text-xl font-semibold mt-[10px] mb-4 text-text dark:text-dark-text">Environmental Filters</Text>

        <FilterSwitch
          label="Water Fountain"
          value={hasWaterFountain}
          onChange={setHasWaterFountain}
        />

        <FilterSwitch
          label="Disabled Toilets"
          value={hasDisabledToilets}
          onChange={setHasDisabledToilets}
        />

        <FilterSwitch
          label="Park"
          value={hasPark}
          onChange={setHasPark}
        />

        <FilterSwitch
          label="Playground"
          value={hasPlayground}
          onChange={setHasPlayground}
        />

        <FilterSwitch
          label="Rubbish Bins"
          value={hasRubbishBin}
          onChange={setHasRubbishBin}
        />

        <FilterSwitch
          label="Off Leash Zones"
          value={hasOffLeash}
          onChange={setHasOffLeash}
        />

        <FilterSwitch
          label="Well Lit Streets"
          value={hasWellLitStreets}
          onChange={setHasWellLitStreets}
        />

        <SaveButton title="Save Custom Walk" onPress={handleSave} />
      </ScrollView>

      <Modal
        animationType={reducedMotion ? "none" : "fade"}
        backdropColor="#00000000"
        visible={confirmVisible}
        onRequestClose={() => setConfirmVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 items-center justify-center"
          activeOpacity={1}
          onPressOut={() => setConfirmVisible(false)}
        >
          <ConfirmBox
            title="Inappropriate language"
            message="Please remove inappropriate language before submitting."
            confirmFunc={() => setConfirmVisible(false)}
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
}