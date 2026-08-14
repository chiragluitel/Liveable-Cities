import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { useRef, useCallback } from "react";
import { useSharedValue } from "react-native-reanimated";
import { useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSearchLogic from "@/src/hooks/useSearchLogic";
import { WalkPlannerBottomSheet, WalkPlannerSheetRef } from "@/src/components/WalkPlanner/BottomSheet/WalkPlannerBottomSheet";
import CaseyMap, { CaseyMapHandle } from "@/src/components/Map/CaseyMap";
import { MapRoute } from "@/src/components/Map/config/mapRouting";
import { useSettings, SPEED_KMH } from "@/src/context/SettingsContext";
import { NearbyPressItem } from "@/src/components/WalkPlanner/Nearby/NearbySection";
import LocationPermissionBanner from "@/src/components/Map/components/LocationPermissionBanner";


const WalkPlannerHomePage = () => {
	const searchState = useSearchLogic();
	const bottomSheetRef = useRef<WalkPlannerSheetRef>(null);
	const mapRef = useRef<CaseyMapHandle>(null);
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const sheetPosition = useSharedValue(Dimensions.get('window').height);
	const { walkingSpeed } = useSettings();

	const handleMapInteraction = () => {
		bottomSheetRef.current?.collapseToSearch();
	};

	const handleWalkSelect = useCallback((route: MapRoute | null) => {
		if (route) {
			mapRef.current?.drawRoute(route);
		} else {
			mapRef.current?.clearRoutes();
		}
	}, []);

	const handleIconTap = useCallback((label: string) => {
		bottomSheetRef.current?.showNavWalk(label);
	}, []);

	const handleNearbySelect = useCallback((item: NearbyPressItem) => {
		mapRef.current?.routeTo(item.lat, item.lng);
	}, []);

	const handleRouteInfo = useCallback((id: string, distance: string) => {
		if (id === 'nav-route') {
			const km = parseFloat(distance);
			const speedKmh = SPEED_KMH[walkingSpeed];
			const totalMin = Math.round((km / speedKmh) * 60);
			const timeText = totalMin < 60
				? `~${totalMin} min walk`
				: `~${Math.floor(totalMin / 60)} hr ${totalMin % 60 > 0 ? totalMin % 60 + ' min ' : ''}walk`;
			bottomSheetRef.current?.updateNavInfo(distance, timeText);
		}
	}, [walkingSpeed]);


	return (
		<View className="flex-1 bg-background-50 dark:bg-dark-background-50">
			<Stack.Screen options={{headerShown: false}} />

			<View className="absolute inset-0" onTouchStart={handleMapInteraction}>
				<CaseyMap ref={mapRef} animatedSheetPosition={sheetPosition} onIconTap={handleIconTap} onRouteInfo={handleRouteInfo} />
			</View>

			{/*
			<TouchableOpacity
				className="absolute left-4 py-2 px-[14px] bg-background-200 dark:bg-dark-background-400 rounded-lg shadow"
				style={{ top: insets.top + 12 }}
				onPress={() => router.back()}
			>
				<Text className="text-base font-semibold text-dark-text-200 dark:text-dark-text">Home</Text>
			</TouchableOpacity>
			*/}

			<LocationPermissionBanner />

			<WalkPlannerBottomSheet ref={bottomSheetRef} searchState={searchState} animatedPosition={sheetPosition} onWalkSelect={handleWalkSelect} onNearbySelect={handleNearbySelect} />
		</View>
	);
}


export default WalkPlannerHomePage;
