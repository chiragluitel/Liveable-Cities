import { TextInput as RNTextInput, Pressable, View } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Mic, Search, XCircle } from "lucide-react-native";
import { SearchLogicReturnObject } from "@/src/hooks/useSearchLogic";
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";

interface BottomSheetSearchBarProps {
    searchState: SearchLogicReturnObject;
    onFocusAction: () => void;
    placeholder?: string;
    inputRef?: React.RefObject<RNTextInput | null>; 
}

export const BottomSheetSearchBar = ({ searchState, onFocusAction, placeholder = "Search...", inputRef }: BottomSheetSearchBarProps) => {
    const { query, handleTextChange, handleBlur, clearSearch } = searchState;

    const { colorScheme } = useColorScheme();
        
    const isLight = colorScheme === "light";

    return (
        <View className="flex-row items-center bg-background-100 dark:bg-dark-background-100 rounded-xl px-3 mx-4 mb-2" style={{ height: 44 }}>
            <Search size={20} color={isLight ? colours.text[500] : colours.dark.text[500]} className="mr-2" />
            <BottomSheetTextInput
                // @ts-expect-error
                ref={inputRef}
                className="flex-1 ml-2"
                style={{ color: isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT, fontSize: 17, paddingVertical: 0 }}
                placeholder={placeholder}
                placeholderTextColor={isLight ? colours.text[400] : colours.dark.text[400]}
                value={query}
                onChangeText={handleTextChange}
                onFocus={onFocusAction}
                onBlur={handleBlur}
                returnKeyType="search"
                clearButtonMode="never"
            />
            {query.length > 0 ? (
                <Pressable onPress={clearSearch} className="p-1 rounded-full active:opacity-50">
                    <XCircle size={18} color={isLight ? colours.text[500] : colours.dark.text[500]} />
                </Pressable>
            ) : (
                <Pressable className="p-1 rounded-full active:opacity-50">
                    <Mic size={20} color={isLight ? colours.text[500] : colours.dark.text[500]} />
                </Pressable>
            )}
        </View>
    );
};