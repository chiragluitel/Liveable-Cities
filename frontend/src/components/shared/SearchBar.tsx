import { Mic, Search, XCircle } from "lucide-react-native"
import { Pressable, TextInput, View } from "react-native"
import { SearchLogicReturnObject } from "@Hooks/useSearchLogic"

interface CustomSearchBarProps {
    searchState : SearchLogicReturnObject,
    placeholder? : string;
}

const CustomSearchBar = ( {searchState, placeholder}: CustomSearchBarProps ) => {
    const {query, handleTextChange, handleFocus, handleBlur, clearSearch } = searchState;
    return (
        <View className="flex-row items-center bg-gray-200 dark:bg-gray-800 rounded-xl px-3 py-2 mx-4 h-11">
            <Search size={20} color={'#8E8E93'} className="mr-2"/>
            <TextInput 
                className="flex-1 text-[17px] text-black dark:text-white ml-2 h-full"
                placeholder={placeholder}
                placeholderTextColor={"#8E8E93"}
                value={query}
                onChangeText={handleTextChange}
                onFocus={handleFocus}
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
    )
}
export default CustomSearchBar;