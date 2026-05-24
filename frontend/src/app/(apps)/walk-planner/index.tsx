import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { useRef, useCallback } from "react";
import { useSharedValue } from "react-native-reanimated";
import { useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSearchLogic from "@/src/hooks/useSearchLogic";
import { WalkPlannerBottomSheet, WalkPlannerSheetRef } from "@/src/components/WalkPlanner/BottomSheet/WalkPlannerBottomSheet";
import CaseyMap, { CaseyMapHandle } from "@/src/components/Map/CaseyMap";
import { MapRoute } from "@/src/components/Map/config/mapRouting";

const WalkPlannerHomePage = () => {
	const searchState = useSearchLogic();
	const bottomSheetRef = useRef<WalkPlannerSheetRef>(null);
	const mapRef = useRef<CaseyMapHandle>(null);
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const sheetPosition = useSharedValue(Dimensions.get('window').height);

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

	const handleRouteInfo = useCallback((id: string, distance: string) => {
		if (id === 'nav-route') {
			const km = parseFloat(distance);
			const mins = Math.round((km / 5) * 60);
			bottomSheetRef.current?.updateNavInfo(distance, `~${mins} min walk`);
		}
	}, []);

	return (
		<View className="flex-1 bg-[#F2F2F7]">
			<Stack.Screen options={{headerShown: false}} />

			<View className="absolute inset-0" onTouchStart={handleMapInteraction}>
				<CaseyMap ref={mapRef} animatedSheetPosition={sheetPosition} onIconTap={handleIconTap} onRouteInfo={handleRouteInfo} />
			</View>

			<TouchableOpacity
				className="absolute left-4 py-2 px-[14px] bg-white rounded-lg shadow"
				style={{ top: insets.top + 12 }}
				onPress={() => router.back()}
			>
				<Text className="text-base font-semibold">Home</Text>
			</TouchableOpacity>

			<WalkPlannerBottomSheet ref={bottomSheetRef} searchState={searchState} animatedPosition={sheetPosition} onWalkSelect={handleWalkSelect} />
		</View>
	);
}


export default WalkPlannerHomePage;
