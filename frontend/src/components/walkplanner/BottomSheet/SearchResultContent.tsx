import { useMemo } from "react";
import { View, Text } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { PLACES } from "@/src/database/MockDB";
import { Places } from "@/src/types/TypesForWalkPlanner";
import { PlaceResultCard } from "../PlaceResultCard";

interface SearchResultsContentProps {
    query: string;
    onInteract: () => void;
}

export const SearchResultsContent = ({ query, onInteract }: SearchResultsContentProps) => {
    
    const filteredPlaces = useMemo(() => {
        if (!query.trim()) return []; 
        
        const lowerQuery = query.toLowerCase();
        
        return PLACES.filter(p => 
            p.title.toLowerCase().includes(lowerQuery) ||
            p.streetAddress.toLowerCase().includes(lowerQuery) ||
            p.suburb.toLowerCase().includes(lowerQuery)
        );
    }, [query]);

    return (
        <BottomSheetFlatList<Places>
            data={filteredPlaces}
            keyExtractor={(item) => item.id}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={onInteract}
            contentContainerStyle={{ 
                flexGrow: 1, 
                paddingBottom: 40, 
                paddingTop: 8 
            }}
            renderItem={({ item, index }) => (
                <PlaceResultCard
                    place={item} 
                    isLast={index === filteredPlaces.length - 1}
                    onPress={(place) => {
                        console.log('Navigating to:', place.title);
                        onInteract();
                    }}
                />
            )}
            ListEmptyComponent={() => (
                query.trim().length > 0 ? (
                    <View className="flex-1 items-center justify-center pt-10">
                        <Text className="text-gray-500 text-[16px] font-medium">
                            No results found for "{query}"
                        </Text>
                        <Text className="text-gray-400 text-[14px] mt-2">
                            Check the spelling or try a different suburb.
                        </Text>
                    </View>
                ) : null
            )}
        />
    );
};