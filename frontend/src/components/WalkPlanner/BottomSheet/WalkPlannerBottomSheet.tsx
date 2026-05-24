import React, { forwardRef, useImperativeHandle, useRef, useCallback, useState, useEffect } from 'react';
import { Keyboard, Text, TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';
import { X } from 'lucide-react-native';
import type { SharedValue } from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetSearchBar } from './BottomSheetSearchBar';
import { WalkPlannerSheetContent } from './WalkPlannerSheetContent';
import { SearchLogicReturnObject } from '@/src/hooks/useSearchLogic';
import { useWalkPlannerSheet } from '@/src/hooks/useWalkPlannerSheet';
import { SearchResultsContent } from './SearchResultContent';
import { getSelectedWalkData } from '@/src/database/walkDetailData';
import { SelectedWalkData } from '@/src/types/walkDetailTypes';
import SelectedWalkContent from '@/src/components/SelectedWalk/SelectedWalkContent';
import { MY_WALKS } from '@/src/database/mockData';
import { MAP_ROUTES, MapRoute } from '@/src/components/Map/config/mapRouting';
import CustomWalkSheetContent from './CustomWalkSheetContent';
import CustomWalkDetail from '@/src/components/CustomWalk/CustomWalkDetail';

interface WalkPlannerSheetProps {
    searchState: SearchLogicReturnObject;
    animatedPosition?: SharedValue<number>;
    onWalkSelect?: (route: MapRoute | null) => void;
}

export interface WalkPlannerSheetRef {
    collapseToSearch: () => void;
    showNavWalk: (label: string) => void;
    updateNavInfo: (distance: string, time: string) => void;
}

export const WalkPlannerBottomSheet = forwardRef<WalkPlannerSheetRef, WalkPlannerSheetProps>(({ searchState, animatedPosition, onWalkSelect }, ref) => {
    const { sheetRef, snapPoints, collapseToSearch, snapToPartial, expandFully } = useWalkPlannerSheet();
    const searchInputRef = useRef<RNTextInput>(null);
    const insets = useSafeAreaInsets();
    const [selectedWalk, setSelectedWalk] = useState<SelectedWalkData | null>(null);
    const [showCustomWalk, setShowCustomWalk] = useState(false);
    const [selectedCustomWalk, setSelectedCustomWalk] = useState<any | null>(null);

    const killSearchFocus = useCallback(() => {
        Keyboard.dismiss();
        searchInputRef.current?.blur();
    }, []);

    useImperativeHandle(ref, () => ({
        collapseToSearch: () => {
            killSearchFocus();
            collapseToSearch();
        },
        showNavWalk: (label: string) => {
            const walkData = getSelectedWalkData('default', label);
            setSelectedWalk({ ...walkData, distanceText: 'Calculating...', durationText: '' });
            snapToPartial();
        },
        updateNavInfo: (distance: string, time: string) => {
            setSelectedWalk(prev => prev ? { ...prev, distanceText: distance, durationText: time } : prev);
        },
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

    const handleWalkPress = useCallback((walkId: string) => {
        const walk = MY_WALKS.find(w => w.id === walkId);
        setSelectedWalk(getSelectedWalkData('default', walk?.title));
        snapToPartial();
        if (walk?.routeId) {
            const route = MAP_ROUTES.find(r => r.id === walk.routeId);
            if (route) onWalkSelect?.(route);
        }
    }, [snapToPartial, onWalkSelect]);

    const handleBack = useCallback(() => {
        setSelectedWalk(null);
        snapToPartial();
        onWalkSelect?.(null);
    }, [snapToPartial, onWalkSelect]);

    const handleCustomWalkOpen = useCallback(() => {
        setShowCustomWalk(true);
        snapToPartial();
    }, [snapToPartial]);

    const handleCustomWalkClose = useCallback(() => {
        if (selectedCustomWalk) {
            setSelectedCustomWalk(null);
        } else {
            setShowCustomWalk(false);
        }
        snapToPartial();
    }, [snapToPartial, selectedCustomWalk]);

    const handleCustomWalkSelect = useCallback((walk: any) => {
        setSelectedCustomWalk(walk);
        snapToPartial();
    }, [snapToPartial]);

    // Snap to 40% after content renders so the new BottomSheetScrollView
    // doesn't override the position set during the press handler.
    useEffect(() => {
        if (selectedWalk) snapToPartial();
    }, [selectedWalk]);

    const isSearchActive = searchState.query.trim().length > 0;

    return (
        <BottomSheet
            ref={sheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            keyboardBehavior="interactive"
            topInset={insets.top + 10}
            backgroundStyle={{ backgroundColor: '#ffffff' }}
            animatedPosition={animatedPosition}
        >
            <View className="flex-1">
                <View className="z-10 bg-white pb-2 pt-1">
                    {selectedWalk || showCustomWalk || selectedCustomWalk ? (
                        <View className="flex-row justify-end px-4" style={{ marginTop: 4 }}>
                            <TouchableOpacity
                                onPress={selectedWalk ? handleBack : handleCustomWalkClose}
                                style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#e5e5e5', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <X size={14} color="#444" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <BottomSheetSearchBar
                            inputRef={searchInputRef}
                            searchState={searchState}
                            onFocusAction={handleSearchFocus}
                        />
                    )}
                </View>

                {isSearchActive ? (
                    <SearchResultsContent
                        query={searchState.query}
                        onInteract={killSearchFocus}
                    />
                ) : selectedWalk ? (
                    <SelectedWalkContent walk={selectedWalk} />
                ) : selectedCustomWalk ? (
                    <CustomWalkDetail walk={selectedCustomWalk} />
                ) : showCustomWalk ? (
                    <CustomWalkSheetContent onWalkPress={handleCustomWalkSelect} />
                ) : (
                    <WalkPlannerSheetContent
                        onInteract={killSearchFocus}
                        onWalkPress={handleWalkPress}
                        onCustomWalkPress={handleCustomWalkOpen}
                    />
                )}
            </View>
        </BottomSheet>
    );
});

WalkPlannerBottomSheet.displayName = 'WalkPlannerBottomSheet';
