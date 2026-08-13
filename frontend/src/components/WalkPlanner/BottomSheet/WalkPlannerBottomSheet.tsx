import React, { forwardRef, useImperativeHandle, useRef, useCallback, useState, useEffect } from 'react';
import { Keyboard, Text, TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';
import { X } from 'lucide-react-native';
import type { SharedValue } from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { colours } from '@Theme/colours';
import { BottomSheetSearchBar } from './BottomSheetSearchBar';
import { WalkPlannerSheetContent } from './WalkPlannerSheetContent';
import { SearchLogicReturnObject } from '@/src/hooks/useSearchLogic';
import { useWalkPlannerSheet } from '@/src/hooks/useWalkPlannerSheet';
import { SearchResultsContent } from './SearchResultContent';
import { getSelectedWalkData } from '@/src/database/walkDetailData';
import { SelectedWalkData } from '@/src/types/walkDetailTypes';
import SelectedWalkContent from '@/src/components/SelectedWalk/SelectedWalkContent';
import AmenityDetailContent from '@/src/components/SelectedWalk/AmenityDetailContent';
import { MAP_ROUTES, MapRoute } from '@/src/components/Map/config/mapRouting';
import CustomWalkDetail from '@/src/components/CustomWalk/CustomWalkDetail';
import { useCustomWalks } from '@/src/context/CustomWalkContext';
import { useCommunityWalks } from '@/src/context/CommunityWalksContext';
import { useRouter } from 'expo-router';
import { NearbyPressItem } from '@/src/components/WalkPlanner/Nearby/NearbySection';
import { Amenity } from '@/src/types/walkPlannerTypes';

interface WalkPlannerSheetProps {
    searchState: SearchLogicReturnObject;
    animatedPosition?: SharedValue<number>;
    onWalkSelect?: (route: MapRoute | null) => void;
    onNearbySelect?: (item: NearbyPressItem) => void;
}

export interface WalkPlannerSheetRef {
    collapseToSearch: () => void;
    showNavWalk: (label: string) => void;
    updateNavInfo: (distance: string, time: string) => void;
}

export const WalkPlannerBottomSheet = forwardRef<WalkPlannerSheetRef, WalkPlannerSheetProps>(({ searchState, animatedPosition, onWalkSelect, onNearbySelect }, ref) => {
    const { sheetRef, snapPoints, collapseToSearch, snapToPartial, expandFully } = useWalkPlannerSheet();
    const searchInputRef = useRef<RNTextInput>(null);
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const [selectedWalk, setSelectedWalk] = useState<SelectedWalkData | null>(null);
    const [selectedCustomWalk, setSelectedCustomWalk] = useState<any | null>(null);
    const [selectedCommunityWalkId, setSelectedCommunityWalkId] = useState<string | null>(null);
    const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
    const { deleteWalk, saveWalk, walks } = useCustomWalks();
    const { communityWalks, incrementDownloads } = useCommunityWalks();
    const router = useRouter();

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
            setSelectedWalk({ ...walkData, distanceText: 'Calculating', durationText: 'please wait' });
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
        const walk = communityWalks.find((w: any) => w.id === walkId);
        setSelectedWalk(getSelectedWalkData('default', walk?.title));
        setSelectedCommunityWalkId(walkId);
        snapToPartial();
        if (walk?.routeId) {
            const route = MAP_ROUTES.find(r => r.id === walk.routeId);
            if (route) onWalkSelect?.(route);
        }
    }, [communityWalks, snapToPartial, onWalkSelect]);

    const handleImportWalk = useCallback((walkId: string) => {
        const walk = communityWalks.find((w: any) => w.id === walkId);
        if (walk) {
            saveWalk({ cuswalkname: walk.title, distance: walk.distanceKm });
            incrementDownloads(walkId);
        }
        setSelectedWalk(null);
        setSelectedCommunityWalkId(null);
        snapToPartial();
        onWalkSelect?.(null);
    }, [communityWalks, saveWalk, incrementDownloads, snapToPartial, onWalkSelect]);

    const handleBack = useCallback(() => {
        setSelectedWalk(null);
        setSelectedCustomWalk(null);
        setSelectedCommunityWalkId(null);
        setSelectedAmenity(null);
        snapToPartial();
        onWalkSelect?.(null);
    }, [snapToPartial, onWalkSelect]);

    useEffect(() => {
        if (selectedCustomWalk) {
            const updated = walks.find((w: any) => w.id === selectedCustomWalk.id);
            if (updated) setSelectedCustomWalk(updated);
        }
    }, [walks]);

    const handleCustomWalkCardPress = useCallback((walk: any) => {
        setSelectedCustomWalk(walk);
        snapToPartial();
    }, [snapToPartial]);

    const handleCustomWalkClose = useCallback(() => {
        setSelectedCustomWalk(null);
        snapToPartial();
    }, [snapToPartial]);

    const handleEditWalk = useCallback((walkId: string) => {
        router.push(`/custom-walk?id=${walkId}` as any);
    }, [router]);

    const handleDeleteWalk = useCallback((walkId: string) => {
        deleteWalk(walkId);
        setSelectedCustomWalk(null);
        snapToPartial();
    }, [deleteWalk, snapToPartial]);

    const handleNearbyPress = useCallback((item: NearbyPressItem) => {
        setSelectedAmenity({
            id: `${item.name}-${item.lat}-${item.lng}`,
            name: item.placeName || item.def.label,
            type: 'Scenic Amenities',
            distanceM: item.distanceM ?? 0,
            lat: item.lat,
            lng: item.lng,
        });
        snapToPartial();
        onNearbySelect?.(item);
    }, [snapToPartial, onNearbySelect]);


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
            backgroundStyle={{ backgroundColor: colorScheme === 'light' ? colours.background[50] : colours.dark.background[100] }}
            animatedPosition={animatedPosition}
            handleIndicatorStyle={{
                backgroundColor: colorScheme === 'light' ? colours.text.DEFAULT : colours.dark.background[900]
            }}
        >
            <View className="flex-1">
                <View className="z-10 bg-background-50 dark:bg-dark-background-100 pb-2 pt-1">
                    {selectedWalk || selectedCustomWalk || selectedAmenity ? (
                        <View className="flex-row justify-end px-4" style={{ marginTop: 4 }}>
                            <TouchableOpacity
                                onPress={selectedCustomWalk ? handleCustomWalkClose : handleBack}
                                className='w-[28] h-[28] rounded-[14] items-center justify-center bg-background-50 dark:bg-dark-background-200'
                            >
                                <X size={14} color={colorScheme === "light" ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
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
                    <SelectedWalkContent
                        walk={selectedWalk}
                        onEdit={selectedCustomWalk ? () => handleEditWalk(selectedCustomWalk.id) : undefined}
                        onDelete={selectedCustomWalk ? () => handleDeleteWalk(selectedCustomWalk.id) : undefined}
                        onImport={selectedCommunityWalkId ? () => handleImportWalk(selectedCommunityWalkId) : undefined}
                    />
                ) : selectedCustomWalk ? (
                    <CustomWalkDetail
                        walk={selectedCustomWalk}
                        onEdit={handleEditWalk}
                        onDelete={handleDeleteWalk}
                    />
                ) : selectedAmenity ? (
                    <AmenityDetailContent amenity={selectedAmenity} />
                ) : (
                    <WalkPlannerSheetContent
                        onInteract={killSearchFocus}
                        onWalkPress={handleWalkPress}
                        onCustomWalkCardPress={handleCustomWalkCardPress}
                        onNearbyPress={handleNearbyPress}
                    />
                )}
            </View>
        </BottomSheet>
    );
});

WalkPlannerBottomSheet.displayName = 'WalkPlannerBottomSheet';
