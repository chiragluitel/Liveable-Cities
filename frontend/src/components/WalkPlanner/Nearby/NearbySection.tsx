import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import { Flame, BookOpen, Armchair, PersonStanding } from 'lucide-react-native';
import { HorizontalCarousel } from '@Components/Shared/HorizontalCarousel';
import { MAP_ICONS, ICON_DEFINITIONS, IconName, IconDefinition } from '@/src/components/Map/config/mapIcons';
import { getLocation, UserLocation } from '@/src/components/Map/config/useMapLocation';
import { useSettings, formatWalkTime } from '@/src/context/SettingsContext';

const ICON_COMPONENT: Record<IconName, React.ReactElement> = {
  bbq:     <Flame          size={22} color="#f97316" />,
  library: <BookOpen       size={22} color="#3b82f6" />,
  bench:   <Armchair       size={22} color="#22c55e" />,
  toilet:  <PersonStanding size={22} color="#8b5cf6" />,
};

export interface NearbyPressItem {
  name: IconName;
  lat: number;
  lng: number;
  def: IconDefinition;
  distanceM: number | null;
}

interface NearbySectionProps {
  onNearbyPress?: (item: NearbyPressItem) => void;
}

function haversineM(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDist(m: number): string {
  return m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${Math.round(m)}m`;
}

export function NearbySection({ onNearbyPress }: NearbySectionProps) {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const { walkingSpeed } = useSettings();
  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    getLocation().then(loc => setUserLocation(loc)).catch(() => {});
  }, []);

  const CARD_WIDTH = windowWidth * 0.85;
  const SNAP_INTERVAL = CARD_WIDTH + 16;

  const items: NearbyPressItem[] = MAP_ICONS
    .map(icon => ({
      ...icon,
      def: ICON_DEFINITIONS[icon.name],
      distanceM: userLocation ? haversineM(userLocation.lat, userLocation.lng, icon.lat, icon.lng) : null,
    }))
    .sort((a, b) => {
      if (a.distanceM == null || b.distanceM == null) return 0;
      return a.distanceM - b.distanceM;
    })
    .slice(0, 15);

  return (
    <View className="mt-6 mb-4">
      <Text className="text-xl font-bold text-text dark:text-dark-text px-4 mb-3">Nearby</Text>
      <HorizontalCarousel<NearbyPressItem>
        data={items}
        keyExtractor={(item) => `${item.name}-${item.lat}-${item.lng}`}
        snapToInterval={SNAP_INTERVAL}
        rows={3}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onNearbyPress?.(item)}
            style={{ width: CARD_WIDTH }}
            className="flex-row items-center bg-background-100 dark:bg-dark-background-100 rounded-2xl p-3 border border-text-100 dark:border-dark-text-50 active:opacity-80"
          >
            <View className="bg-background-50 dark:bg-dark-background-200 p-2 rounded-xl mr-3 shadow-sm">
              {ICON_COMPONENT[item.name]}
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-text dark:text-dark-text" numberOfLines={1}>
                {item.def.label}
              </Text>
              {item.distanceM != null ? (
                <Text className="text-xs text-text-600 dark:text-dark-text-600 font-medium mt-0.5">
                  {formatDist(item.distanceM)} • {formatWalkTime(item.distanceM / 1000, walkingSpeed)}
                </Text>
              ) : (
                <Text className="text-xs text-text-600 dark:text-dark-text-600 font-medium mt-0.5">
                  Tap to route
                </Text>
              )}
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
