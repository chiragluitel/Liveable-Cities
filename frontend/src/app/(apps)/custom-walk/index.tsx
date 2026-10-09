import React, { useState, useEffect } from 'react';
import { Alert, Text, ScrollView, TouchableOpacity, View, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from '../../login-page';
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
import { CASEY_COORDINATES } from '@/src/components/Map/config/mapConfig';
import { getLocation } from '@/src/components/Map/config/useMapLocation';

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
  const [hasBbq, setHasBbq] = useState(false);
  // Where the generated route starts; falls back to Casey if location is unavailable.
  const [startLocation, setStartLocation] = useState({ lat: CASEY_COORDINATES.latitude, lng: CASEY_COORDINATES.longitude });

  const [alertVisible, setAlertVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);

    // for login
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    
    const { reducedMotion, backendURL } = useSettings();

  useEffect(() => {
    getLocation().then(loc => { if (loc) setStartLocation({ lat: loc.lat, lng: loc.lng }); });
  }, []);

  //for login
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const loginStatus = await AsyncStorage.getItem("loggedIn");

    setLoggedIn(loginStatus === "true");
  };

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
        setHasRubbishBin(existingWalk.hasRubbishBin);
        setHasOffLeash(existingWalk.hasOffLeash);
        setHasBbq(Boolean(existingWalk.hasBbq));
      }
    }
  }, [params.id, walks]);

  //modified for login (was previously handleSave())
  const saveWalkToAccount = async () => {

    const filter = new Filter();

    if (filter.isProfane(cuswalkname)) {
      setConfirmVisible(true);
      return
    }

    const selectedFilters = [
      hasWaterFountain ? 'fountain' : null,
      hasDisabledToilets ? 'disabledToilets' : null,
      hasOffLeash ? 'offLeash' : null,
      hasBbq ? 'bbq' : null,
    ].filter((f): f is string => Boolean(f));

    // Ask the backend to generate a route matching the distance and filters.
    let route;
    try {
      const res = await fetch(`${backendURL}/api/custom-walk-route`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: cuswalkname || 'Custom Walk', targetDistanceKm: distance, selectedFilters, start: startLocation }),
      });
      if (!res.ok) throw new Error(await res.text());
      route = await res.json();
    } catch (error) {
      console.error('Failed to create custom walk route:', error);
      Alert.alert('Route Error', 'Could not create custom walk route. Please check backend connection.');
      return;
    }

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
      hasBbq,
      selectedFilters,
      routeDistanceMeters: route.distanceMeters,
      routeDurationSeconds: route.durationSeconds,
      routeDistanceText: route.distanceText,
      routeDurationText: route.durationText,
      routeGeoJson: route.routeGeoJson,
    };

    await saveWalk(walkData);
    router.back();
  };

  //added for login
    const handleSave = async () => {
      //for login
      const loginStatus = await AsyncStorage.getItem("loggedIn");

      if (loginStatus !== "true") {
        setShowLogin(true);

        return;
      }

      await saveWalkToAccount();
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
          label="Toilets"
          value={hasDisabledToilets}
          onChange={setHasDisabledToilets}
        />

        <FilterSwitch
          label="Off Leash"
          value={hasOffLeash}
          onChange={setHasOffLeash}
        />

        <FilterSwitch
          label="BBQ"
          value={hasBbq}
          onChange={setHasBbq}
        />

        <SaveButton title='Save Custom Walk' onPress={handleSave} />

      </ScrollView>

      {/*Confirm Message*/}
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

      <Modal
        visible={showLogin}
        animationType="slide"
        onRequestClose={() => setShowLogin(false)}
      >
        <View className="flex-1 bg-background-50 dark:bg-dark-background-100">

          <View className="flex-row justify-end px-5 pt-5">
            <TouchableOpacity
              onPress={() => setShowLogin(false)}
            >
              <Text className="text-primary-500 font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          <LoginPage
            onLogin={async () => {
              setLoggedIn(true);
              setShowLogin(false);

              await saveWalkToAccount();
            }}
            onBack={() => setShowLogin(false)}
          />

        </View>
      </Modal>
    </View>
  );
}
