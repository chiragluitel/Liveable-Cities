import { ReactNode } from "react";
import { Text, View } from "react-native";

type SettingsGroupProps = {
  title: string
  children: ReactNode
};

export default function SettingsGroup({title="title", children}: SettingsGroupProps) {
  return (
    <View className="w-[90%] pb-[10]">
      <Text className="text-sm text-[#8E8E93] p-[8]">{title}</Text>
      <View className="w-full bg-white rounded-[10]">
        {children}
      </View>
    </View>
  );
}