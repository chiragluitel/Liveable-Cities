import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRef } from "react";
import { useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSearchLogic from "@/src/hooks/useSearchLogic";
import { WalkPlannerBottomSheet, WalkPlannerSheetRef } from "@/src/components/walkplanner/BottomSheet/WalkPlannerBottomSheet";
import CaseyMap from "@/src/components/map/CaseyMap";
import { useColorScheme } from "nativewind";

const WalkPlannerHomePage = () => {
	const searchState = useSearchLogic();
	const bottomSheetRef = useRef<WalkPlannerSheetRef>(null);
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const handleMapInteraction = () => {
		bottomSheetRef.current?.collapseToSearch();
	};

	const { colorScheme } = useColorScheme();
	
	const isLight = colorScheme === "light";

	return (
		<View className="flex-1 bg-background-50 dark:bg-dark-background-50">
			<Stack.Screen options={{headerShown: false}} />

			{/* Map takes up the full screen behind the bottom sheet */}
			<View className="absolute inset-0" onTouchStart={handleMapInteraction}>
				<CaseyMap />
			</View>

			<TouchableOpacity
				style={[styles.backBtnShadown, { top: insets.top + 12 }]}
				onPress={() => router.back()}
				className="absolute left-[16] py-[8] px-[14] bg-background-200 dark:bg-dark-background-400 rounded-[8]"
			>
				<Text className="text-base font-semibold text-dark-text-200 dark:text-dark-text">‹ Back</Text>
			</TouchableOpacity>

			<WalkPlannerBottomSheet ref={bottomSheetRef} searchState={searchState} />
		</View>
	);
}

const styles = StyleSheet.create({
	backBtnShadown: {
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 4,
	}
});


export default WalkPlannerHomePage;