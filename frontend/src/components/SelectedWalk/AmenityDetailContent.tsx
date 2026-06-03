import React from 'react';
import { View, Text } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Amenity } from '@/src/types/walkPlannerTypes';
import { useSettings, SPEED_KMH } from '@/src/context/SettingsContext';

function formatTime(distanceM: number, speedKmh: number): string {
  const totalMinutes = Math.round((distanceM / 1000 / speedKmh) * 60);
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`;
}

export default function AmenityDetailContent({ amenity }: { amenity: Amenity }) {
  const { walkingSpeed } = useSettings();
  const timeText = formatTime(amenity.distanceM, SPEED_KMH[walkingSpeed]);
  const distanceText = amenity.distanceM >= 1000
    ? `${(amenity.distanceM / 1000).toFixed(1)} km`
    : `${amenity.distanceM}m`;

  return (
    <BottomSheetScrollView
      contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-6">
        <Text className="text-[29px] leading-[35px] font-black text-text dark:text-dark-text mb-1">
          {amenity.name}
        </Text>
        <Text className="text-[17px]">
          <Text className="text-accent dark:text-dark-accent-700">
            {distanceText} • {timeText} walk
          </Text>
        </Text>
      </View>
    </BottomSheetScrollView>
  );
}
