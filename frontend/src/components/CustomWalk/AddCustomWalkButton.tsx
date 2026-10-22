import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddCustomWalkButton() {
  const { colorScheme } = useColorScheme();
  const isLight = colorScheme === "light";
  const router = useRouter();

const handleAddCustomWalk = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem('loggedIn');

      if (loginStatus === 'true') {
        router.push('/custom-walk' as any);
      } else {
        router.push({
          pathname: '/login-page',
          params: {
            returnTo: '/custom-walk',
            cancelTo: '/custom-walks',
          },
        } as any);
      }
    } catch (error) {
      console.error('Failed to check login status:', error);
    }
  };

  return (
    // <Link href={"/custom-walk" as any} asChild>
    //   <TouchableOpacity className="flex-row bg-background-400 dark:bg-dark-background-300 rounded-xl items-center justify-center mb-6 p-4">
    //     <Ionicons name="add" size={24} color={isLight ? colours.text[50] : colours.dark.text.DEFAULT} />
    //     <Text className="text-text-50 dark:text-dark-text text-lg font-semibold ml-2">Add Custom Walk</Text>
    //   </TouchableOpacity>
    // </Link>

    <TouchableOpacity
      onPress={handleAddCustomWalk}
      className="flex-row bg-background-400 dark:bg-dark-background-300 rounded-xl items-center justify-center mb-6 p-4"
    >
      <Ionicons
        name="add"
        size={24}
        color={
          isLight
            ? colours.text[50]
            : colours.dark.text.DEFAULT
        }
      />
      <Text className="text-text-50 dark:text-dark-text text-lg font-semibold ml-2">
        Add Custom Walk
      </Text>
    </TouchableOpacity>
  );
}
