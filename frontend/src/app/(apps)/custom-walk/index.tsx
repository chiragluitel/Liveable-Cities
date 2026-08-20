import React, { useState, useEffect } from 'react';
import { Text, ScrollView, TouchableOpacity, View } from 'react-native';
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

  useEffect(() => {
    if (params.id) {
      const existingWalk = walks.find((w: any) => String(w.id) === String(params.id));
      if (existingWalk) {
        setcuswalk(existingWalk.cuswalkname);
        setDistance(Number(existingWalk.distance) || 1);
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
    const walkData = {
      id: params.id,
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

    saveWalk(walkData);
    router.back();
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

        <SaveButton title='Save Custom Walk' onPress={handleSave} />

      </ScrollView>

    </View>
  );
}
