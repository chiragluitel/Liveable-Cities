import React from "react";
import { Pressable, Text, View } from "react-native";
import { Flame, BookOpen, Armchair, PersonStanding, MapPin } from "lucide-react-native";
import { NearbyPlace, NearbyPlaceType } from "@Types/walkDetailTypes";

type SelectedWalkNearbyItemProps = {
  place: NearbyPlace;
  isSelected: boolean;
  onNearbyPress: (place: NearbyPlace) => void;
};

const PLACE_STYLES: Record<string, { backgroundColor: string; icon: React.ReactElement }> = {
  bbq:     { backgroundColor: '#f4d7b5', icon: <Flame size={30} color="#f97316" /> },
  library: { backgroundColor: '#d9e8ff', icon: <BookOpen size={30} color="#3b82f6" /> },
  bench:   { backgroundColor: '#dfe3de', icon: <Armchair size={30} color="#22c55e" /> },
  toilet:  { backgroundColor: '#d9d4ff', icon: <PersonStanding size={30} color="#8b5cf6" /> },
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
      className={`flex-row items-center mb-[22px] rounded-2xl py-[6px] px-1 ${isSelected ? "bg-[#f0f1ed]" : ""}`}
      onPress={() => onNearbyPress(place)}
    >
      <View
        className="w-[74px] h-[74px] rounded-full justify-center items-center mr-[18px]"
        style={{ backgroundColor: placeStyle.backgroundColor }}
      >
        {placeStyle.icon}
      </View>

      <Text className="text-lg text-[#111] font-normal">{place.label}</Text>
    </Pressable>
  );
}
