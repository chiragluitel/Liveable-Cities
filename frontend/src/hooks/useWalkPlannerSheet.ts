import { useRef, useCallback, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

export const useWalkPlannerSheet = () => {
  const sheetRef = useRef<BottomSheet>(null);
  
  const snapPoints = useMemo(() => ['12%', '40%', '90%'], []);

  const collapseToSearch = useCallback(() => sheetRef.current?.snapToIndex(0), []);
  const snapToPartial = useCallback(() => sheetRef.current?.snapToIndex(1), []);
  const expandFully = useCallback(() => sheetRef.current?.snapToIndex(2), []);

  return { 
    sheetRef, 
    snapPoints, 
    collapseToSearch, 
    snapToPartial, 
    expandFully 
  };
};