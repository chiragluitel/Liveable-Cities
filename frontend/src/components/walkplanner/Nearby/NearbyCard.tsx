import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { 
  Trees, 
  Waves, 
  Camera, 
  Dumbbell, 
  MapPin, 
  BatteryCharging, 
  UtilityPole 
} from 'lucide-react-native';
import { Amenity } from '@/src/types/TypesForWalkPlanner';

const AMENITY_ICON_MAP: Record<string, React.ReactElement> = {
  'Scenic Waterway': <Waves size={24} color="#0284c7" />,
  'Grass Park': <Trees size={24} color="#16a34a" />,     
  'Scenic Amenities': <Camera size={24} color="#db2777" />,
  'Sports Facilities': <Dumbbell size={24} color="#ea580c" />,
  'Scenic Fun': <MapPin size={24} color="#8b5cf6" />,    
  'Toilet': <UtilityPole size={24} color="#475569" />,
  'Charging': <BatteryCharging size={24} color="#10b981" />,
};

interface NearbyCardProps {
  amenity: Amenity;
  width: number;
  onPress?: (id: string) => void;
}

export const NearbyCard = ({ amenity, width, onPress }: NearbyCardProps) =>  {
    //icon bind & fallback
  const IconComponent = AMENITY_ICON_MAP[amenity.type] || <MapPin size={24} color="#9CA3AF" />;

  return (
    <Pressable
      onPress={() => onPress?.(amenity.id)}
      style={{ width }} 
      className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-3 border border-gray-200 dark:border-gray-700 active:opacity-80"
    >
      <View className="bg-white dark:bg-gray-700 p-2 rounded-xl mr-3 shadow-sm">
        {IconComponent}
      </View>
      <View className="flex-1">
        <Text className="text-sm font-bold text-gray-900 dark:text-white" numberOfLines={1}>
          {amenity.name}
        </Text>
        <Text className="text-xs text-gray-500 font-medium mt-0.5">
          {amenity.distanceM}m away
        </Text>
      </View>
    </Pressable>
  );
}