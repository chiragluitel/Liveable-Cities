import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";

type SaveButtonProps = {
  onPress: () => void;
  title: string;
};

export default function SaveButton({ onPress, title }: SaveButtonProps) {
  const { colorScheme } = useColorScheme();
  const isLight = colorScheme === "light";
  const [isLoading, setIsLoading] = useState(false);
  const changeState  = () => {
    setIsLoading(true);
    onPress()
  };

  return (
    <TouchableOpacity className="flex-row bg-primary-600 dark:bg-dark-accent-400 p-4 rounded-xl items-center justify-center mt-5 mb-10" onPress={changeState}>
      {!isLoading && 
        <View className='flex-row'>
          <Ionicons name="save" size={24} color={isLight ? colours.text[50] : colours.dark.text.DEFAULT} />
          <Text className="text-text-50 dark:text-dark-text text-lg font-semibold ml-2">{title}</Text>
        </View>
      }
      {isLoading && 
        <View className='flex-row'>
          <ActivityIndicator color={isLight ? colours.text[50] : colours.dark.text.DEFAULT}/>
        </View>
      }
    </TouchableOpacity>
  );
}
