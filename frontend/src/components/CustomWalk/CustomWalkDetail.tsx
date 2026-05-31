import React from 'react';
import { View, Text } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import SelectedWalkActionRow from '../SelectedWalk/SelectedWalkActionRow';

export default function CustomWalkDetail({ walk }: { walk: any }) {
  return (
    <BottomSheetScrollView
      contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-[6px]">
        <Text className="text-[29px] leading-[35px] font-black text-[#111] mb-1">{walk.cuswalkname || 'Custom Walk'}</Text>
        <Text className="text-[17px] mb-[22px]">
          <Text className="text-[#2677e8]">{walk.distance} km</Text>
        </Text>
      </View>

      <SelectedWalkActionRow />
    </BottomSheetScrollView>
  );
}
