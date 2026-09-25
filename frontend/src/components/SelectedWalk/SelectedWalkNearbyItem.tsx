import React from "react";
import { Pressable, Text, View } from "react-native";
import { MapPin } from "lucide-react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { FA6_ICON_NAMES } from '@/src/components/Map/config/mapIcons';
import { NearbyPlace, NearbyPlaceType } from "@Types/walkDetailTypes";

type SelectedWalkNearbyItemProps = {
  place: NearbyPlace;
  isSelected: boolean;
  onNearbyPress: (place: NearbyPlace) => void;
};

// Same icons as the map's own pins, so a selected walk's nearby list matches.
const PLACE_STYLES: Record<string, { backgroundColor: string; icon: React.ReactElement }> = {
  bbq:      { backgroundColor: '#f4d7b5', icon: <FontAwesome6 name={FA6_ICON_NAMES.bbq} size={26} color="#f97316" /> },
  library:  { backgroundColor: '#d9e8ff', icon: <FontAwesome6 name={FA6_ICON_NAMES.library} size={26} color="#3b82f6" /> },
  bench:    { backgroundColor: '#dfe3de', icon: <FontAwesome6 name={FA6_ICON_NAMES.bench} size={26} color="#22c55e" /> },
  toilet:   { backgroundColor: '#d9d4ff', icon: <FontAwesome6 name={FA6_ICON_NAMES.toilet} size={26} color="#8b5cf6" /> },
  fountain: { backgroundColor: '#d3f1f7', icon: <FontAwesome6 name={FA6_ICON_NAMES.fountain} size={26} color="#06b6d4" /> },
};

const DEFAULT_PLACE_STYLE = { backgroundColor: '#dcdedd', icon: <MapPin size={30} color="#555" /> };

export default function SelectedWalkNearbyItem({
  place,
  isSelected,
  onNearbyPress,
}: SelectedWalkNearbyItemProps) {
  const placeStyle = PLACE_STYLES[place.placeType] ?? DEFAULT_PLACE_STYLE;

  return (
    <Pressable
      className={`flex-row items-center mb-[22px] rounded-2xl py-[6px] px-1 ${isSelected ? "bg-primary-100 dark:bg-dark-primary-300" : ""}`}
      onPress={() => onNearbyPress(place)}
    >
      <View
        className="w-[74px] h-[74px] rounded-full justify-center items-center mr-[18px]"
        style={{ backgroundColor: placeStyle.backgroundColor }}
      >
        {placeStyle.icon}
      </View>

      <Text className="text-lg text-text dark:text-dark-text font-normal">{place.label}</Text>
    </Pressable>
  );
}
