import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage({onLogin}: {onLogin: () => void}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch("http://10.0.2.2:5156/api/Auth/login", {
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

  return (
    <View className="flex-1 bg-background-50 dark:bg-dark-background-50 px-5 pt-12">
      <Text className="text-3xl font-bold mb-8">
        Login
      </Text>

      <Text className="mb-2">
        Username
      </Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
        className="border border-gray-300 rounded-lg px-4 py-3 mb-5"
        autoCapitalize="none"
      />

      <Text className="mb-2">
        Password
      </Text>

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
        className="border border-gray-300 rounded-lg px-4 py-3 mb-5"
      />

      {error !== "" && (
        <Text className="text-red-500 mb-4">
          {error}
        </Text>
      )}

      <Pressable
        onPress={handleLogin}
        className="bg-primary-500 rounded-lg py-4 items-center"
      >
        <Text className="text-white font-bold">
          Login
        </Text>
      </Pressable>
    </View>
  );
}