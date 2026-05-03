import { useRef, useCallback } from 'react';
import { WalkPlannerSheetRef } from '@/src/components/walkplanner/BottomSheet/WalkPlannerBottomSheet';
import { SelectedItem } from '../types/TypesForWalkPlanner';


export const useWalkPlannerSheet = () => {
  const sheetRef = useRef<WalkPlannerSheetRef>(null);

  const collapseToSearch = useCallback(() => sheetRef.current?.collapseToSearch(), []);
  const selectPlace = useCallback(
    (item: SelectedItem) => sheetRef.current?.selectPlace(item),
    []
  );

  return { sheetRef, collapseToSearch, selectPlace };
};