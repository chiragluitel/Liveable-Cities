import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Trees, Waves, Camera, Dumbbell, MapPin, BatteryCharging, UtilityPole } from 'lucide-react-native';
import { Amenity } from '@/src/types/walkPlannerTypes';
import { useColorScheme } from 'nativewind';
import { colours } from '@Theme/colours';
import { useSettings, SPEED_KMH } from '@/src/context/SettingsContext';

const AMENITY_ICON_MAP: Record<string, React.ReactElement> = {
  'Scenic Waterway':  <Waves    size={24} color="#0284c7" />,
  'Grass Park':       <Trees    size={24} color="#16a34a" />,
  'Scenic Amenities': <Camera   size={24} color="#db2777" />,
  'Sports Facilities':<Dumbbell size={24} color="#ea580c" />,
  'Scenic Fun':       <MapPin   size={24} color="#8b5cf6" />,
  'Toilet':           <UtilityPole size={24} color="#475569" />,
  'Charging':         <BatteryCharging size={24} color="#10b981" />,
};

function formatDistanceTime(distanceM: number, speedKmh: number): string {
  const totalMinutes = Math.round((distanceM / 1000 / speedKmh) * 60);
  if (totalMinutes < 60) return `${totalMinutes} min walk`;
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return mins > 0 ? `${hrs} hr ${mins} min walk` : `${hrs} hr walk`;
}

interface NearbyCardProps {
  amenity: Amenity;
  width: number;
  onPress?: (amenity: Amenity) => void;
}

export const NearbyCard = ({ amenity, width, onPress }: NearbyCardProps) => {
  const { colorScheme } = useColorScheme();
  const isLight = colorScheme === 'light';
  const { walkingSpeed } = useSettings();

  const IconComponent = AMENITY_ICON_MAP[amenity.type] || <MapPin size={24} color={isLight ? colours.text.DEFAULT : colours.dark.text[800]} />;
  const timeText = formatDistanceTime(amenity.distanceM, SPEED_KMH[walkingSpeed]);

  return (
    <Pressable
      onPress={() => onPress?.(amenity)}
      style={{ width }}
      className="flex-row items-center bg-background-100 dark:bg-dark-background-100 rounded-2xl p-3 border border-text-100 dark:border-dark-text-50 active:opacity-80"
    >
      <View className="bg-background-50 dark:bg-dark-background-200 p-2 rounded-xl mr-3 shadow-sm">
        {IconComponent}
      </View>
      <View className="flex-1">
        <Text className="text-sm font-bold text-text dark:text-dark-text" numberOfLines={1}>
          {amenity.name}
        </Text>
        <Text className="text-xs text-text-600 dark:text-dark-text-600 font-medium mt-0.5">
          {amenity.distanceM >= 1000
            ? `${(amenity.distanceM / 1000).toFixed(1)} km`
            : `${Math.round(amenity.distanceM)}m`} • {timeText}
        </Text>
      </View>
    </Pressable>
  );
};
