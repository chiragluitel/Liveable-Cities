import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRef } from "react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSearchLogic from "@/src/hooks/useSearchLogic";
import { WalkPlannerBottomSheet, WalkPlannerSheetRef } from "@/src/components/walkplanner/BottomSheet/WalkPlannerBottomSheet";
import CaseyMap from "@/src/components/map/CaseyMap";

const WalkPlannerHomePage = () => {
	const searchState = useSearchLogic();
	const bottomSheetRef = useRef<WalkPlannerSheetRef>(null);
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const handleMapInteraction = () => {
		bottomSheetRef.current?.collapseToSearch();
	};

	return (
		<View className="flex-1 bg-[#F2F2F7]">
			{/* Map takes up the full screen behind the bottom sheet */}
			<View className="absolute inset-0" onTouchStart={handleMapInteraction}>
				<CaseyMap />
			</View>

			{/* Please make this button point to the homepage when you do navigation */}
			<TouchableOpacity
				style={[styles.backBtn, { top: insets.top + 12 }]}
				onPress={() => router.back()}
				
			>
				<Text style={styles.backLabel}>‹ Back</Text>
			</TouchableOpacity>

			<WalkPlannerBottomSheet ref={bottomSheetRef} searchState={searchState} />
		</View>
	);
}

const styles = StyleSheet.create({
	backBtn: {
		position: 'absolute',
		left: 16,
		paddingVertical: 8,
		paddingHorizontal: 14,
		backgroundColor: 'white',
		borderRadius: 8,
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 4,
	},
	backLabel: {
		fontSize: 16,
		fontWeight: '600',
	},
});


export default WalkPlannerHomePage;