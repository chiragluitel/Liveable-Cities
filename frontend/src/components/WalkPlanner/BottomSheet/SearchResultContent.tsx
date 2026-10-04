import { ActivityIndicator, View, Text } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Places } from "@/src/types/walkPlannerTypes";
import { SearchLogicReturnObject } from "@/src/hooks/useSearchLogic";
import { PlaceResultCard } from "../PlaceResultCard";

interface SearchResultsContentProps {
    searchState: SearchLogicReturnObject;
    onInteract: () => void;
}

export const SearchResultsContent = ({ searchState, onInteract }: SearchResultsContentProps) => {
    const { query, results, isLoading, error } = searchState;

    const renderEmptyState = () => {
        if (isLoading) {
            return (
                <View className="flex-1 items-center justify-center pt-10">
                    <ActivityIndicator />
                </View>
            );
        }

        if (error) {
            return (
                <View className="flex-1 items-center justify-center pt-10">
                    <Text className="text-text-600 dark:text-dark-text-600 text-[16px] font-medium">
                        {error}
                    </Text>
                    <Text className="text-text-500 dark:text-dark-text-500 text-[14px] mt-2">
                        Check your connection and try again.
                    </Text>
                </View>
            );
        }

        if (!query.trim()) return null;

        return (
            <View className="flex-1 items-center justify-center pt-10">
                <Text className="text-text-600 dark:text-dark-text-600 text-[16px] font-medium">
                    {`No results found for "${query}"`}
                </Text>
                <Text className="text-text-500 dark:text-dark-text-500 text-[14px] mt-2">
                    Check the spelling or try a different suburb.
                </Text>
            </View>
        );
    };

    return (
        <BottomSheetFlatList<Places>
            data={results}
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
                    isLast={index === results.length - 1}
                    onPress={(place) => {
                        console.log('Navigating to:', place.title);
                        onInteract();
                    }}
                />
            )}
            ListEmptyComponent={renderEmptyState}
        />
    );
};
