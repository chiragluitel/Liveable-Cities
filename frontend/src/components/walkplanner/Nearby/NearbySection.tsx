import { Amenity } from '@/src/types/TypesForWalkPlanner';
import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ClickableHeader } from '@Components/shared/ClickableHeader';
import { HorizontalCarousel } from '@Components/shared/HorizontalCarousel';
import { NearbyCard } from './NearbyCard';

interface NearbySectionProps {
  amenities: Amenity[];
  onHeaderPress?: () => void;
  onAmenityPress?: (amenityId: string) => void;
}

export function NearbySection({ amenities, onHeaderPress, onAmenityPress }: NearbySectionProps) {
  const { width: windowWidth } = useWindowDimensions();
  
  const CARD_WIDTH = windowWidth * 0.55; 
  const GAP = 16;
  const SNAP_INTERVAL = CARD_WIDTH + GAP;

  if (!amenities || amenities.length === 0) return null;

  return (
    <View className="mt-6 mb-4">
      <ClickableHeader header="Nearby" onHeaderPress={() => onHeaderPress?.()} />

      <HorizontalCarousel<Amenity> data={amenities} rows={3} keyExtractor={(item) => item.id} snapToInterval={SNAP_INTERVAL} renderItem={({ item }) => (
                <NearbyCard amenity={item} width={CARD_WIDTH} onPress={onAmenityPress} /> 
            )}
      />
    </View>
  );
}