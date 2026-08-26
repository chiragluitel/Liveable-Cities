import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Amenity } from '@/src/types/walkPlannerTypes';
import { useSettings, SPEED_KMH } from '@/src/context/SettingsContext';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { colours } from '@/src/theme/colours';

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
    : `${Math.round(amenity.distanceM)}m`;

  const { colorScheme } = useColorScheme();
  const isLight = colorScheme === 'light';

  const { addToWeeklyWalks } = useSettings();

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
          <Text className="text-accent-600 dark:text-dark-accent-700">
            {distanceText} • {timeText} walk
          </Text>
        </Text>
        <TouchableOpacity
          className="flex-1 bg-accent-200 dark:bg-dark-accent-200 rounded-[18px] py-[18px] mt-3 justify-center items-center mr-[10px]"
          onPress={() => addToWeeklyWalks()}
        >
          <Ionicons name="add-circle-outline" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
          <Text className="text-text dark:text-dark-text font-bold text-[15px] mt-2  text-wrap text-center px-1">Add to Weekly Walks</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetScrollView>
  );
}
