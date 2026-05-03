import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Dimensions, Pressable, Text, TextInput as RNTextInput, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { MapPin } from 'lucide-react-native';
import { SearchLogicReturnObject } from '@/src/hooks/useSearchLogic';

import { WalkPlannerSheetContent } from './WalkPlannerSheetContent';
import { SearchResultsContent } from './SearchResultContent';
import { PlaceDetailSheet, PlaceDetailSheetRef } from './PlaceDetailSheet';
import { BottomSheetSearchBar } from './BottomSheetSearchbar';
import { useWalkPlannerSheetFns } from '@/src/hooks/useWalkPlannerSheetFns';
import { SelectedItem } from '@/src/types/TypesForWalkPlanner';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Props { searchState: SearchLogicReturnObject; }
export interface WalkPlannerSheetRef {
  collapseToSearch: () => void;
  selectPlace: (item: SelectedItem) => void;
}

export const WalkPlannerBottomSheet = forwardRef<WalkPlannerSheetRef, Props>(({ searchState }, ref) => {
  const inputRef = useRef<RNTextInput>(null);
  const placeSheetRef = useRef<PlaceDetailSheetRef>(null);
  
  const {
    translateY, snapIndex, selectedItem, setSelectedItem, pan, 
    collapseToSearch, handleItemSelect, handleWalkPress, snapToIdx, jsDismissKeyboard
  } = useWalkPlannerSheetFns(SCREEN_HEIGHT, searchState, placeSheetRef, inputRef);

  useImperativeHandle(ref, () => ({
    collapseToSearch,
    selectPlace: handleItemSelect,
  }), [collapseToSearch, handleItemSelect]);

  const animatedSheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));
  const isSearchActive = searchState.query.trim().length > 0;

  return (
    <>
      <Animated.View 
        className="absolute left-0 right-0 z-[100] bg-white rounded-t-[12px]" 
        style={[{ height: SCREEN_HEIGHT, shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 24 }, animatedSheetStyle]}
      >
        <GestureDetector gesture={pan}>
          <View className="items-center pt-2 pb-2.5 px-0">
            <View className="w-9 h-[5px] rounded-full bg-[#D1D1D6]" />
          </View>
        </GestureDetector>

        <View className="pb-2 pt-0.5">
            <BottomSheetSearchBar inputRef={inputRef} searchState={searchState} onFocusAction={() => { searchState.handleFocus(); snapToIdx(2); }} />
        </View>

        {snapIndex > 0 && (
          <View className="flex-1">
            {isSearchActive ? (
              <SearchResultsContent query={searchState.query} onInteract={jsDismissKeyboard} onSelectPlace={(place) => handleItemSelect({ type: 'place', data: place })} />
            ) : (
              <WalkPlannerSheetContent onInteract={jsDismissKeyboard} onWalkPress={handleWalkPress} />
            )}
          </View>
        )}
      </Animated.View>

      <PlaceDetailSheet 
        ref={placeSheetRef} 
        onDismiss={() => { setSelectedItem(null); snapToIdx(1); }} 
      />
    </>
  );
});