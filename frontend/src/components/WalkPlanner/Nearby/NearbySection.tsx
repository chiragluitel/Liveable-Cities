import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import { Flame, BookOpen, Armchair, PersonStanding, Droplet } from 'lucide-react-native';
import { HorizontalCarousel } from '@Components/Shared/HorizontalCarousel';
import { MAP_ICONS, ICON_DEFINITIONS, IconName, IconDefinition, MapIconEntry } from '@/src/components/Map/config/mapIcons';
import { getLocation, UserLocation } from '@/src/components/Map/config/useMapLocation';
import { useSettings, formatWalkTime } from '@/src/context/SettingsContext';
import { fetchAllAmenityIcons } from '@/src/api/amenities';
import { useMapFilter } from '@/src/context/MapFilterContext';

// Same colour used for each type's pin on the map and its row in the Filter
// panel, so a Nearby card is visually tied to both.
const ICON_COMPONENT: Record<IconName, React.ReactElement> = {
  bbq:      <Flame          size={20} color="#fff" />,
  library:  <BookOpen       size={20} color="#fff" />,
  bench:    <Armchair       size={20} color="#fff" />,
  toilet:   <PersonStanding size={20} color="#fff" />,
  fountain: <Droplet        size={20} color="#fff" />,
};

export interface NearbyPressItem {
  name: IconName;
  lat: number;
  lng: number;
  def: IconDefinition;
  distanceM: number | null;
  // Real name from the backend, e.g. "Cranbourne Library". Falls back to the category label.
  placeName?: string;
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
  // Real amenity locations from the backend (all benches/toilets/libraries/
  // bbqs in Casey), not just the 4-point MAP_ICONS demo set — needed for
  // "closest 9" to mean something. Falls back to MAP_ICONS if the backend
  // can't be reached so the section still shows something.
  const [amenities, setAmenities] = useState<MapIconEntry[]>(MAP_ICONS);
  const { walkingSpeed } = useSettings();
  const { visibleIcons } = useMapFilter();
  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    getLocation().then(loc => setUserLocation(loc)).catch(() => {});
  }, []);

  useEffect(() => {
    fetchAllAmenityIcons().then(setAmenities).catch(() => {});
  }, []);

  const CARD_WIDTH = windowWidth * 0.85;
  const SNAP_INTERVAL = CARD_WIDTH + 16;

  // Only rank once we know where the user is — otherwise "closest" is
  // meaningless, so show nothing rather than an arbitrary/unsorted list.
  // Types the user has hidden in the Filter panel are excluded entirely.
  const items: NearbyPressItem[] = userLocation
    ? amenities
        .filter(icon => visibleIcons[icon.name])
        .map(icon => ({
          ...icon,
          def: ICON_DEFINITIONS[icon.name],
          distanceM: haversineM(userLocation.lat, userLocation.lng, icon.lat, icon.lng),
        }))
        .sort((a, b) => a.distanceM - b.distanceM)
        .slice(0, 9)
    : [];

  return (
    <View className="mt-6 mb-4">
      <Text className="text-xl font-bold text-text dark:text-dark-text px-4 mb-3">Nearby</Text>
      {items.length === 0 ? (
        <Text className="text-sm text-text-600 dark:text-dark-text-600 px-4">
          There isn't anything nearby.
        </Text>
      ) : (
      <HorizontalCarousel<NearbyPressItem>
        data={items}
        keyExtractor={(item) => `${item.name}-${item.lat}-${item.lng}`}
        snapToInterval={SNAP_INTERVAL}
        rows={3}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onNearbyPress?.(item)}
            style={{ width: CARD_WIDTH }}
            className="flex-row items-center bg-background-100 dark:bg-dark-background-200 rounded-2xl px-3.5 py-3.5 border border-text-100 dark:border-dark-text-50 active:opacity-80"
          >
            <View
              className="w-11 h-11 rounded-full items-center justify-center mr-3.5 shadow-sm shrink-0"
              style={{ backgroundColor: item.def.color }}
            >
              {ICON_COMPONENT[item.name]}
            </View>
            <View className="flex-1 gap-1">
              <Text className="text-sm font-bold text-text dark:text-dark-text leading-[18px]" numberOfLines={1}>
                {item.placeName || item.def.label}
              </Text>
              <Text className="text-xs text-text-600 dark:text-dark-text-600 font-medium leading-[14px]">
                {formatDist(item.distanceM!)} • {formatWalkTime(item.distanceM! / 1000, walkingSpeed)}
              </Text>
            </View>
          </Pressable>
        )}
      />
      )}
    </View>
  );
}
