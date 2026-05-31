import React, { useEffect, useState, useCallback } from 'react';
import { Text, TouchableOpacity, Linking, AppState, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin } from 'lucide-react-native';

export default function LocationPermissionBanner() {
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const opacity = useSharedValue(0);

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
      style={[
        animStyle,
        { position: 'absolute', top: insets.top + 12, left: 0, right: 0, alignItems: 'center', zIndex: 20 },
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.85}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          backgroundColor: 'rgba(20,20,20,0.82)',
          paddingHorizontal: 16,
          paddingVertical: 9,
          borderRadius: 20,
        }}
      >
        <MapPin size={14} color="#fff" />
        <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600', letterSpacing: 0.2 }}>
          Share Location
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
