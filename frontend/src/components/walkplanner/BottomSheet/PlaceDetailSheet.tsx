import React, { forwardRef, useImperativeHandle } from 'react';
import { Dimensions, Text, View, Pressable, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, Navigation, Download, MoreHorizontal, Share2 } from 'lucide-react-native';
import { Places, Walk } from '@/src/types/TypesForWalkPlanner';
import { usePlaceDetailSheetFns } from '@/src/hooks/usePlaceDetailSheetFns';
import { NearbySection } from '../Nearby/NearbySection';
import { NEARBY_AMENITIES } from '@/src/database/MockDB';


export type SelectedItem = { type: 'walk'; data: Walk } | { type: 'place'; data: Places } | null;

export interface PlaceDetailSheetRef {
  present: (item: SelectedItem) => void;
  dismiss: () => void;
}

const formatters = {
  title: (item: SelectedItem) => item?.data.title || '',
  meta: (item: SelectedItem) => {
    if (!item) return '';
    if (item.type === 'walk') return `${item.data.difficulty} · ${item.data.distanceKm} km · ${item.data.durationMin} min`;
    const p = item.data as Places;
    return `${p.streetAddress}, ${p.suburb} ${p.state}`;
  },
  rating: (item: SelectedItem) => item?.type === 'walk' && item.data.rating ? `${item.data.rating} ⭐ (${item.data.reviewCount ?? 0} reviews)` : null,
};

const NATIVE_STYLES = {
  sheetShadow: {
    height: Dimensions.get('window').height,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.16, shadowRadius: 12, elevation: 32,
  },
};

export const PlaceDetailSheet = forwardRef<PlaceDetailSheetRef, { onDismiss?: () => void }>(
  ({ onDismiss }, ref) => {
    const insets = useSafeAreaInsets();
    const { selectedItem, isExpanded, isVisible, animatedStyle, pan, present, jsDismiss } = usePlaceDetailSheetFns(onDismiss);

    useImperativeHandle(ref, () => ({ present, dismiss: jsDismiss }), [present, jsDismiss]);

    return (
      <Animated.View className="absolute left-0 right-0 bg-[#F2F2F7] rounded-t-[14px] z-[200]" style={[NATIVE_STYLES.sheetShadow, animatedStyle]} pointerEvents={isVisible ? 'auto' : 'none'}>
        <GestureDetector gesture={pan}>
          <View className="items-center pt-2 pb-1">
            <View className="w-9 h-[5px] rounded-full bg-[#C7C7CC]" />
          </View>
        </GestureDetector>

        {isVisible && selectedItem && (
          <ScrollView className="flex-1" contentContainerStyle={[{ paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false} scrollEnabled={isExpanded} scrollEventThrottle={16}>
            <View className="px-4 pt-1">
              <View className="flex-row justify-between items-start mt-2 mb-1 gap-2">
                <Text className="flex-1 text-[24px] font-extrabold text-[#111] tracking-[-0.3px]" numberOfLines={2}>
                  {formatters.title(selectedItem)}
                </Text>
                <View className="flex-row gap-2 mt-0.5">
                  <Pressable className="w-[38px] h-[38px] rounded-full bg-[#E5E5EA] justify-center items-center" hitSlop={8}><Share2 size={18} color="#636366" /></Pressable>
                  <Pressable className="w-[38px] h-[38px] rounded-full bg-[#E5E5EA] justify-center items-center" onPress={jsDismiss} hitSlop={8}><X size={20} color="#636366" /></Pressable>
                </View>
              </View>

              {formatters.rating(selectedItem) && <Text className="text-[14px] text-[#111] font-medium mb-0.5">{formatters.rating(selectedItem)}</Text>}
              <Text className="text-[14px] text-[#636366] mb-4">{formatters.meta(selectedItem)}</Text>

              <View className="flex-row gap-2.5 mb-4">
                <Pressable className="flex-[1.4] bg-black rounded-[13px] py-[13px] flex-row justify-center items-center gap-1.5">
                  <Navigation size={18} color="#fff" />
                  <Text className="text-white font-bold text-[14px]">Start Walk</Text>
                </Pressable>
                <Pressable className="flex-1 bg-[#E5E5EA] rounded-[13px] py-[13px] flex-row justify-center items-center gap-[5px]">
                  <Download size={18} color="#111" />
                  <Text className="text-[#111] font-semibold text-[13px]">Function</Text>
                </Pressable>
                <Pressable className="flex-1 bg-[#E5E5EA] rounded-[13px] py-[13px] flex-row justify-center items-center gap-[5px]">
                  <MoreHorizontal size={18} color="#111" />
                  <Text className="text-[#111] font-semibold text-[13px]">More</Text>
                </Pressable>
              </View>

              <View className="flex-row gap-2 mb-[18px]">
                {['Photo 1', 'Photo 2'].map((photo, i) => (
                  <View key={i} className="flex-1 h-[130px] rounded-[12px] bg-[#C7C7CC] justify-center items-center">
                    <Text className="text-[#636366] text-[13px] font-medium">{photo}</Text>
                  </View>
                ))}
                <View className="w-[52px] h-[130px] rounded-[12px] bg-[#C7C7CC] justify-center items-center">
                  <Text className="text-[#636366] text-[13px] font-medium">+3</Text>
                </View>
              </View>

              {isExpanded && (
                <View className='pl-4'>
                  <Text className="text-[18px] font-bold text-[#111] mb-1.5">About</Text>
                  <Text className="text-[15px] leading-[22px] text-[#3A3A3C] mb-4">
                    A calm scenic walk with paved paths, shaded areas, and nearby community facilities. Suitable for all fitness levels.
                  </Text>
                </View>
              )}

              {!isExpanded && <Text className="text-center text-[12px] text-[#AEAEB2] mt-1 mb-2">Pull up for more details</Text>}

              <NearbySection amenities={NEARBY_AMENITIES} onAmenityPress={() => {}}/>
            </View>

          </ScrollView>
        )}
      </Animated.View>
    );
  }
);