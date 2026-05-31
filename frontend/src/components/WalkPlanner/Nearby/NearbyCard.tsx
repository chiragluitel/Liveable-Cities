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
import { Amenity } from '@/src/types/walkPlannerTypes';
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";

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
  const { colorScheme } = useColorScheme();
	const isLight = colorScheme === "light";

    //icon bind & fallback
  const IconComponent = AMENITY_ICON_MAP[amenity.type] || <MapPin size={24} color={isLight ? colours.text.DEFAULT : colours.dark.text[800]} />;

  return (
    <Pressable
      onPress={() => onPress?.(amenity.id)}
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
          {amenity.distanceM}m away
        </Text>
      </View>
    </Pressable>
  );
}