import { TextInput as RNTextInput, Pressable, View } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Mic, Search, XCircle } from "lucide-react-native";
import { SearchLogicReturnObject } from "@/src/hooks/useSearchLogic";

interface BottomSheetSearchBarProps {
  inputRef: React.RefObject<RNTextInput | null>;
  searchState: SearchLogicReturnObject;
  onFocusAction: () => void;
}


export const BottomSheetSearchBar = ({ inputRef, searchState, onFocusAction }: BottomSheetSearchBarProps) => {
  const { query, handleTextChange, handleBlur, clearSearch } = searchState;
  return (
    <View className="flex-row items-center bg-[#E5E5EA] rounded-[12px] px-3 mx-4 h-11 gap-2">
      <Search size={18} color="#8E8E93" />
      
      <RNTextInput
        ref={inputRef}
        className="flex-1 text-[17px] text-black py-0"
        placeholder="Search walks, places..."
        placeholderTextColor="#8E8E93"
        value={query}
        onChangeText={handleTextChange}
        onFocus={onFocusAction}
        onBlur={handleBlur}
        returnKeyType="search"
        clearButtonMode="never"
        autoCorrect={false}
      />
      
      {query.length > 0 ? (
        <Pressable onPress={clearSearch} hitSlop={8}>
          <XCircle size={18} color="#8E8E93" />
        </Pressable>
      ) : (
        <Pressable hitSlop={8}>
          <Mic size={18} color="#8E8E93" />
        </Pressable>
      )}
    </View>
  );
};