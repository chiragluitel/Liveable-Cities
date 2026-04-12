import { View, Text } from "react-native";
import { useRef } from "react";
import useSearchLogic from "@/src/hooks/useSearchLogic";
import {  WalkPlannerBottomSheet, WalkPlannerSheetRef } from "@/src/components/walkplanner/BottomSheet/WalkPlannerBottomSheet";



const WalkPlannerHomePage = () => {
    const searchState = useSearchLogic();
    const bottomSheetRef = useRef<WalkPlannerSheetRef>(null);

    const handleMapInteraction = () => {
        bottomSheetRef.current?.collapseToSearch();
    };

    return (
        <View className="flex-1 bg-[#F2F2F7]"> 
            <View 
                className="absolute inset-0 items-center justify-center"
                onTouchStart={handleMapInteraction}
            >
                <Text className="text-gray-400 font-bold">Map Rendered Here</Text> 
            </View>

            <WalkPlannerBottomSheet ref={bottomSheetRef} searchState={searchState} />
        </View>
    );
}

export default WalkPlannerHomePage;