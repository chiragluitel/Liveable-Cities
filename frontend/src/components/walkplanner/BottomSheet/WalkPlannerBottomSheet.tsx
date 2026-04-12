import React, { forwardRef, useImperativeHandle } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { WalkPlannerSheetContent } from './WalkPlannerSheetContent';
import { SearchLogicReturnObject } from '@/src/hooks/useSearchLogic';
import { useWalkPlannerSheet } from '@/src/hooks/useWalkPlannerSheet';
import { BottomSheetSearchBar } from './BottomSheetSearchbar';

interface WalkPlannerSheetProps {
    searchState: SearchLogicReturnObject;
}

export interface WalkPlannerSheetRef {
    collapseToSearch: () => void;
}

export const WalkPlannerSheet = forwardRef<WalkPlannerSheetRef, WalkPlannerSheetProps>(({ searchState }, ref) => {
    const { sheetRef, snapPoints, collapseToSearch, expandFully } = useWalkPlannerSheet();

    useImperativeHandle(ref, () => ({
        collapseToSearch
    }));

    const handleSearchFocus = () => {
        searchState.handleFocus();
        expandFully();
    };

    return (
        <BottomSheet
            ref={sheetRef}
            index={1}
            snapPoints={snapPoints}
            keyboardBehavior="interactive"
            backgroundStyle={{ backgroundColor: '#ffffff', borderRadius: 24 }}
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 40 }}
        >
            <BottomSheetView>
                <BottomSheetSearchBar searchState={searchState} onFocusAction={handleSearchFocus} />
            </BottomSheetView>
            
            <WalkPlannerSheetContent />
        </BottomSheet>
    );
});

WalkPlannerSheet.displayName = 'WalkPlannerSheet';