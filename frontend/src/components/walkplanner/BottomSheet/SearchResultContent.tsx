import { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { PLACES } from "@/src/database/MockDB";
import { Places } from "@/src/types/TypesForWalkPlanner";
import { PlaceResultCard } from "../PlaceResultCard";

interface SearchResultsContentProps {
    query: string;
    onInteract: () => void;
    onSelectPlace?: (place: Places) => void;
}

export const SearchResultsContent = ({ query, onInteract, onSelectPlace }: SearchResultsContentProps) => {

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
        <FlatList<Places>
            data={filteredPlaces}
            keyExtractor={(item) => item.id}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={onInteract}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 40,
                paddingTop: 8,
            }}
            renderItem={({ item, index }) => (
                <PlaceResultCard
                    place={item}
                    isLast={index === filteredPlaces.length - 1}
                    onPress={(place) => {
                        onInteract();
                        onSelectPlace?.(place);
                    }}
                />
            )}
            ListEmptyComponent={() => (
                query.trim().length > 0 ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 40 }}>
                        <Text style={{ color: '#8E8E93', fontSize: 16, fontWeight: '500' }}>
                            No results for "{query}"
                        </Text>
                        <Text style={{ color: '#AEAEB2', fontSize: 14, marginTop: 6 }}>
                            Check spelling or try a different suburb.
                        </Text>
                    </View>
                ) : null
            )}
        />
    );
};