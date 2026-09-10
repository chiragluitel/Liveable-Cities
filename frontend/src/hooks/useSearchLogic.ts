import { useEffect, useState } from "react";
import { Places } from "@Types/walkPlannerTypes";
import { searchPlaces } from "@/src/api/search";

const DEBOUNCE_MS = 300;

export interface SearchLogicReturnObject {
    query: string;
    isFocused: boolean;
    results: Places[];
    isLoading: boolean;
    error: string | null;
    handleTextChange: (text: string) => void;
    handleFocus: () => void;
    handleBlur: () => void;
    clearSearch: () => void;
}

const useSearchLogic = (initialValue: string =''): SearchLogicReturnObject => {
    const [query, setQuery] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState<Places[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTextChange = (text: string) => setQuery(text);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const clearSearch = () => setQuery('');

    useEffect(() => {
        const term = query.trim();

        if (!term) {
            setResults([]);
            setIsLoading(false);
            setError(null);
            return;
        }

        const controller = new AbortController();
        setIsLoading(true);

        const timer = setTimeout(async () => {
            try {
                const places = await searchPlaces(term, controller.signal);
                setResults(places);
                setError(null);
            } catch {
                if (controller.signal.aborted) return;
                setResults([]);
                setError('Could not load search results.');
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        }, DEBOUNCE_MS);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [query]);

    return {
        query, isFocused, results, isLoading, error,
        handleTextChange, handleFocus, handleBlur, clearSearch
    }
};
export default useSearchLogic;
