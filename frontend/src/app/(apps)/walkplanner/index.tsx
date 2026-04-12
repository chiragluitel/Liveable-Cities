import { View, Text } from "react-native";
import { useRef } from "react";
import useSearchLogic from "@/src/hooks/useSearchLogic";
import { WalkPlannerSheet, WalkPlannerSheetRef } from "@/src/components/walkplanner/BottomSheet/WalkPlannerBottomSheet";



const WalkPlannerHomePage = () => {
    const searchState = useSearchLogic();
    const bottomSheetRef = useRef<WalkPlannerSheetRef>(null);

    // This will be bound to your Map's onPanDrag or onRegionChange event later
    const handleMapInteraction = () => {
        bottomSheetRef.current?.collapseToSearch();
    };

    return (
        <View className="flex-1 bg-[#F2F2F7]"> 
            {/* Map Container Placeholder */}
            <View 
                className="absolute inset-0 items-center justify-center"
                onTouchStart={handleMapInteraction} // Temporarily attached to view to simulate map drag
            >
                <Text className="text-gray-400 font-bold">Map Rendered Here</Text> 
            </View>

            <WalkPlannerSheet ref={bottomSheetRef} searchState={searchState} />
        </View>
    );
}

export default WalkPlannerHomePage;