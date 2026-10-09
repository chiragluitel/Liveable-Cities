import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { colours } from "@/src/theme/colours";import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSettings } from "../context/SettingsContext";

export default function LoginPage({
  onLogin,
  onBack,
}: {
  onLogin: () => void;
  onBack: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const {backendURL} = useSettings();
  const {colorScheme} = useColorScheme();

  const handleLogin = async () => {
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your username and password");

      return; 
    }

    try {
      const response = await fetch(`${backendURL}/api/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        setError("Invalid username or password.");
        return;
      }

      const data = await response.json();

      await AsyncStorage.setItem("loggedIn", "true");
      await AsyncStorage.setItem("username", data.username);

      onLogin();

      console.log("Login successful:", data);
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    }
  };

  const handleRegister = async () => {
    setError("");

    if (!username.trim() || !password || !confirmPassword) {
      setError("Please complete all fields.");

      return;
    }

    try {
      const response = await fetch(`${backendURL}/api/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password, 
        }),
      });

      if (response.status === 409) {
        setError("Username already exists.");

        return;
      }

      if (!response.ok) {
        setError("Unable to create account.");

        return;
      }

      const data = await response.json();

      await AsyncStorage.setItem("loggedIn", "true");
      await AsyncStorage.setItem("username", "data.username");

      onLogin();

      console.log("Registration successful: ", data);
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    }
  };

   return (
    <View className="flex-1 bg-background-50 dark:bg-dark-background-50">

    {/* Back button */}
    <View className="px-4 pt-5 pb-3">
      <TouchableOpacity
        onPress={onBack}
        className="flex-row items-center gap-1.5 py-2 px-3 rounded-full bg-accent-200 dark:bg-dark-accent active:opacity-70 self-start"
      >
        <ChevronLeft
          size={16}
          color={
            colorScheme === "light"
              ? colours.text.DEFAULT
              : colours.dark.text.DEFAULT
          }
        />

        <Text className="text-sm font-semibold text-text dark:text-dark-text pr-2">
          Back
        </Text>
      </TouchableOpacity>
    </View>

    <View className="px-5 pt-4">

      <Text className="text-text dark:text-dark-text text-3xl font-bold mb-8">
        {isRegistering ? "Create Account" : "Login"}
      </Text>

      <Text className="text-text dark:text-dark-text mb-2">
        Username
      </Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
        className="text-text dark:text-dark-text border border-gray-300 rounded-lg px-4 py-3 mb-5"
        autoCapitalize="none"
      />

      <Text className="text-text dark:text-dark-text mb-2">
        Password
      </Text>

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
        className="text-text dark:text-dark-text border border-gray-300 rounded-lg px-4 py-3 mb-5"
      />

      {isRegistering && (
        <>
          <Text className="text-text dark:text-dark-text mb-2">
            Confirm Password
          </Text>

          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            secureTextEntry
            className="text-text dark:text-dark-text border border-gray-300 rounded-lg px-4 py-3 mb-5"
          />
        </>
      )}

      {error !== "" && (
        <Text className="text-red-500 mb-4">
          {error}
        </Text>
      )}

      <TouchableOpacity
        onPress={isRegistering ? handleRegister : handleLogin}
        className="bg-primary-500 rounded-lg py-4 items-center"
      >
        <Text className="text-white font-bold">
          {isRegistering ? "Create Account" : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setIsRegistering(!isRegistering);
          setError("");
          setConfirmPassword("");
        }}
        className="mt-5 items-center"
      >
        <Text className="text-primary-500 font-semibold">
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Create one"}
        </Text>
      </TouchableOpacity>
      
      </View>

    </View>
  );
}