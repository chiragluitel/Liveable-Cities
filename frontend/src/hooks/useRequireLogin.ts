import { useCallback } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Wraps an action so it only runs when logged in, otherwise opens the login screen
export const useRequireLogin = () => {
  const router = useRouter();

  return useCallback(async (action: () => void) => {
    try {
      const loginStatus = await AsyncStorage.getItem("loggedIn");

      if (loginStatus === "true") {
        action();
        return;
      }
    } catch (error) {
      console.error("Failed to check login status:", error);
    }

    router.push("/login-page" as any);
  }, [router]);
};
