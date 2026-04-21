import { useColorScheme } from "nativewind";
import { Linking, Text, TouchableHighlight, View } from "react-native";
import { colors } from "@Theme/colours";
import { Ionicons } from "@expo/vector-icons";

type WebLinkProps = {
  text: string
  link: string
};

export default function WebLinkButton({text, link}: WebLinkProps) {
  const { colorScheme } = useColorScheme();
  
  const isLight = colorScheme === "light";

  
  function openLink() {
    Linking.canOpenURL(link).then(() => {
      Linking.openURL(link);
    });
  }

  return (
    <TouchableHighlight
      onPress={openLink}
      style={{borderRadius: 10}}
      underlayColor={isLight ? colors.background[400] : colors.dark.background[50]}
    >
      <View className="flex-row items-center bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]">
        <Ionicons name="open-outline" size={17} color={isLight ? colors.accent[600] : colors.dark.accent[600]} />
        <Text style={{fontSize: 17, paddingLeft: 5}} className="text-accent-600 dark:text-accent-600">{text}</Text>
      </View>
    </TouchableHighlight>
  );
}