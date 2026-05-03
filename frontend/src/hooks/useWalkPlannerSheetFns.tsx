import { useState, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import {Places, Walk } from '@/src/types/TypesForWalkPlanner';
import { SearchLogicReturnObject } from '@/src/hooks/useSearchLogic';
import { SelectedItem } from '../components/walkplanner/BottomSheet/PlaceDetailSheet';
import { SPRING_CONFIG } from '../constants/WalkPlannerConstants';

const FRACS = [0.10, 0.42, 0.92];

export function useWalkPlannerSheetFns(
  screenHeight: number, 
  searchState: SearchLogicReturnObject, 
  placeSheetRef: React.RefObject<any>, 
  inputRef: React.RefObject<any>
) {
  const snapTYs = FRACS.map((f) => screenHeight - f * screenHeight);
  const translateY = useSharedValue(snapTYs[1]);
  const [snapIndex, setSnapIndex] = useState(1);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);

  const jsDismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
    inputRef.current?.blur();
  }, [inputRef]);

  const snapToIdx = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(2, idx));
    translateY.value = withSpring(snapTYs[clamped], SPRING_CONFIG);
    setSnapIndex(clamped);
  }, [translateY, snapTYs]);

  const collapseToSearch = useCallback(() => {
    jsDismissKeyboard();
    snapToIdx(0);
  }, [jsDismissKeyboard, snapToIdx]);

  const handleItemSelect = useCallback((item: SelectedItem) => {
    jsDismissKeyboard();
    searchState.clearSearch();
    setSelectedItem(item);
    snapToIdx(0);
    placeSheetRef.current?.present(item);
  }, [jsDismissKeyboard, searchState, snapToIdx, placeSheetRef]);

  const handleWalkPress = useCallback((walkId: string) => {
    // TODO: Move to a dedicated repository/service hook
    const { MY_WALKS } = require('@/src/database/MockDB');
    const walk = MY_WALKS.find((w: Walk) => w.id === walkId);
    if (walk) handleItemSelect({ type: 'walk', data: walk });
  }, [handleItemSelect]);

  const pan = Gesture.Pan()
    .onChange((e) => {
      const next = translateY.value + e.changeY;
      const minTY = snapTYs[2];
      const maxTY = snapTYs[0];
      translateY.value = next < minTY ? minTY - (minTY - next) * 0.18 : next > maxTY ? maxTY + (next - maxTY) * 0.18 : next;
    })
    .onFinalize((e) => {
      'worklet';
      const biased = translateY.value + e.velocityY * 0.1;
      let best = 0, bestDist = Math.abs(biased - snapTYs[0]);
      for (let i = 1; i < snapTYs.length; i++) {
        const d = Math.abs(biased - snapTYs[i]);
        if (d < bestDist) { bestDist = d; best = i; }
      }
      translateY.value = withSpring(snapTYs[best], SPRING_CONFIG);
      scheduleOnRN(setSnapIndex, best);
      if (best < 2) scheduleOnRN(jsDismissKeyboard);
    })
    .activeOffsetY([-6, 6]).failOffsetX([-20, 20]);

  return {
    translateY, snapIndex, setSnapIndex, selectedItem, setSelectedItem,
    pan, collapseToSearch, handleItemSelect, handleWalkPress, snapToIdx, jsDismissKeyboard
  };
}