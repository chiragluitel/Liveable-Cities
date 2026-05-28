import { ReactNode } from "react";
import { Text, View } from "react-native";

type SettingsGroupProps = {
  title: string
  children: ReactNode
};

export default function SettingsGroup({title, children}: SettingsGroupProps) {
  return (
    <View className="w-[90%] pb-[10]">
      <Text className="text-sm text-text-500 dark:text-dark-text-500 p-[8]">{title}</Text>
      <View className="w-full bg-background-100 dark:bg-dark-background-100 rounded-[10]">
        {children}
      </View>
    </View>
  );
}