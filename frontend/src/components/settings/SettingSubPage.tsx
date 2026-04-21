import { colors } from "@Theme/colours";
import Ionicons from "@expo/vector-icons/Ionicons"
import { useColorScheme } from "nativewind";
import { Text, TouchableHighlight, View } from "react-native";

type SubPageProps = {
  title: string
  navigateFunc: () => void
  hideSeperator?: boolean
};

export default function SettingsSubPage({title, navigateFunc, hideSeperator = false}: SubPageProps) {
  const { colorScheme } = useColorScheme();
  
  const isLight = colorScheme === "light";
  
  return (
    <View className={`w-full bg-background-100 dark:bg-dark-background-100 rounded-[10] 
    ${hideSeperator ? "" : "border-b-text-200 dark:border-b-dark-text-400 border-b-hairline"}`}>
      <TouchableHighlight
        onPress={() => navigateFunc()}
        className="rounded-[10]"
        underlayColor={isLight ? colors.background[400] : colors.dark.background[50]}
      >
        <View className="flex-row justify-between bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]">
          <Text style={{fontSize: 17}} className="text-text dark:text-dark-text">{title}</Text>
          <Ionicons name="chevron-forward" size={17} color={isLight ? colors.primary[700] : colors.dark.primary[300]} />
        </View>
      </TouchableHighlight>
    </View>
  );
}