import { useState } from "react";

export interface SearchLogicReturnObject {
    query: string;
    isFocused: boolean;
    handleTextChange: (text: string) => void;
    handleFocus: () => void;
    handleBlur: () => void;
    clearSearch: () => void;
}

const useSearchLogic = (initialValue: string =''): SearchLogicReturnObject => {
    const [query, setQuery] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);

    const handleTextChange = (text: string) => setQuery(text);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const clearSearch = () => setQuery('');

    return {
        query, isFocused, handleTextChange, handleFocus, handleBlur, clearSearch
    }
};
export default useSearchLogic;