import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "expo-router/build/global-state/router-store";

function useAsyncStorage(key: any, initialValue: any) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        setStoredValue(item != null ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error("Error loading from AsyncStorage", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadValue();
  }, [key]);

  const setValue = async (value: any) => {
    try {
      const valueToStore = 
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error("Error setting AsyncStorage", error);
    }
  };

  return [storedValue, setValue, isLoading];
}

export default useAsyncStorage;