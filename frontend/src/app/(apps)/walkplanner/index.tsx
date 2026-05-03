import { View, TouchableOpacity, Text } from "react-native";
import { useRef } from "react";
import { useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSearchLogic from "@/src/hooks/useSearchLogic";
import {
  WalkPlannerBottomSheet,
  WalkPlannerSheetRef,
} from "@/src/components/walkplanner/BottomSheet/WalkPlannerBottomSheet";
import CaseyMap from "@/src/components/map/CaseyMap";

const NATIVE_STYLES = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
};

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
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="absolute inset-0 z-0" onTouchStart={handleMapInteraction}>
        <CaseyMap />
      </View>
      
      <TouchableOpacity
        className="absolute left-4 py-2 px-3.5 bg-white rounded-lg z-10"
        style={[{ top: insets.top + 12 }, NATIVE_STYLES.shadow]}
        onPress={() => router.back()}
      >
        <Text className="text-[16px] font-semibold text-black">‹ Back</Text>
      </TouchableOpacity>
      
      <WalkPlannerBottomSheet ref={bottomSheetRef} searchState={searchState} />
    </View>
  );
};

export default WalkPlannerHomePage;