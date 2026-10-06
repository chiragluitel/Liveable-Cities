import React, { useEffect, useState, useCallback } from 'react';
import { Text, TouchableOpacity, Linking, AppState, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin } from 'lucide-react-native';
import { colours } from '@Theme/colours';
import { useColorScheme } from 'nativewind';

export default function LocationPermissionBanner() {
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const opacity = useSharedValue(0);

  const { colorScheme } = useColorScheme();
  const isLight = colorScheme === 'light';

  const checkPermission = useCallback(async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === 'granted') {
      opacity.value = withTiming(0, { duration: 250 });
      setTimeout(() => setVisible(false), 250);
    } else {
      setVisible(true);
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, []);

  useEffect(() => {
    checkPermission();
    const sub = AppState.addEventListener('change', state => {
      if (state === 'active') checkPermission();
    });
    return () => sub.remove();
  }, [checkPermission]);

  async function handlePress() {
    const { status, canAskAgain } = await Location.getForegroundPermissionsAsync();
    if (status !== 'granted' && canAskAgain) {
      const { status: next } = await Location.requestForegroundPermissionsAsync();
      if (next === 'granted') {
        opacity.value = withTiming(0, { duration: 250 });
        setTimeout(() => setVisible(false), 250);
      }
    } else if (status !== 'granted') {
      Linking.openSettings();
    }
  }

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="box-none"
      className="absolute left-0 right-0 items-center z-20"
      style={[animStyle, { top: insets.top + 12 }]}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.85}
        className="flex-row items-center gap-[6px] bg-text-300 dark:bg-dark-text-400 px-4 py-[9px] rounded-[20px]"
      >
        <MapPin size={14} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
        <Text className="text-text dark:text-dark-text text-[13px] font-semibold tracking-[0.2]">
          Enable Location
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
