import { TextInput as RNTextInput, Pressable, View } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Mic, Search, XCircle } from "lucide-react-native";
import { SearchLogicReturnObject } from "@/src/hooks/useSearchLogic";

interface BottomSheetSearchBarProps {
    searchState: SearchLogicReturnObject;
    onFocusAction: () => void;
    placeholder?: string;
    inputRef?: React.RefObject<RNTextInput | null>; 
}

export const BottomSheetSearchBar = ({ searchState, onFocusAction, placeholder = "Search...", inputRef }: BottomSheetSearchBarProps) => {
    const { query, handleTextChange, handleBlur, clearSearch } = searchState;

    return (
        <View className="flex-row items-center bg-gray-200 dark:bg-gray-800 rounded-xl px-3 mx-4 mb-2" style={{ height: 44 }}>
            <Search size={20} color={'#8E8E93'} className="mr-2" />
            <BottomSheetTextInput
                // @ts-expect-error
                ref={inputRef}
                className="flex-1 ml-2"
                style={{ color: '#000000', fontSize: 17, paddingVertical: 0 }}
                placeholder={placeholder}
                placeholderTextColor={"#8E8E93"}
                value={query}
                onChangeText={handleTextChange}
                onFocus={onFocusAction}
                onBlur={handleBlur}
                returnKeyType="search"
                clearButtonMode="never"
            />
            {query.length > 0 ? (
                <Pressable onPress={clearSearch} className="p-1 rounded-full active:opacity-50">
                    <XCircle size={18} color="#8E8E93" />
                </Pressable>
            ) : (
                <Pressable className="p-1 rounded-full active:opacity-50">
                    <Mic size={20} color="#8E8E93" />
                </Pressable>
            )}
        </View>
    );
};