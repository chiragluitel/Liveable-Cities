import React, { forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import { Keyboard, TextInput as RNTextInput, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetSearchBar } from './BottomSheetSearchbar';
import { WalkPlannerSheetContent } from './WalkPlannerSheetContent';
import { SearchLogicReturnObject } from '@/src/hooks/useSearchLogic';
import { useWalkPlannerSheet } from '@/src/hooks/useWalkPlannerSheet';

interface WalkPlannerSheetProps {
    searchState: SearchLogicReturnObject;
}

export interface WalkPlannerSheetRef {
    collapseToSearch: () => void;
}

export const WalkPlannerBottomSheet = forwardRef<WalkPlannerSheetRef, WalkPlannerSheetProps>(({ searchState }, ref) => {
    const { sheetRef, snapPoints, collapseToSearch, expandFully } = useWalkPlannerSheet();
    const searchInputRef = useRef<RNTextInput>(null);
    const insets = useSafeAreaInsets(); 

    const killSearchFocus = useCallback(() => {
        Keyboard.dismiss();
        searchInputRef.current?.blur();
    }, []);

    useImperativeHandle(ref, () => ({
        collapseToSearch: () => {
            killSearchFocus();
            collapseToSearch();
        }
    }));

    const handleSearchFocus = () => {
        searchState.handleFocus();
        expandFully(); 
    };

    const handleSheetChanges = useCallback((index: number) => {
        if (index < 2) { 
            killSearchFocus();
        }
    }, [killSearchFocus]);

    return (
        <BottomSheet
            ref={sheetRef}
            index={1} 
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            keyboardBehavior="interactive"
            topInset={insets.top + 10}
            backgroundStyle={{ backgroundColor: '#ffffff' }}
        >
            <View className="flex-1">
                {/* Static Header Layer */}
                <View className="z-10 bg-white pb-2 pt-1 shadow-sm">
                    <BottomSheetSearchBar 
                        inputRef={searchInputRef} 
                        searchState={searchState} 
                        onFocusAction={handleSearchFocus} 
                    />
                </View>
                {/* Scroll Layer */}
                <WalkPlannerSheetContent onInteract={killSearchFocus} />
                
            </View>
        </BottomSheet>
    );
});

WalkPlannerBottomSheet.displayName = 'WalkPlannerBottomSheet';