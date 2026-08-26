import { useColorScheme } from "nativewind";
import { Platform, Text, TouchableHighlight, View } from "react-native";
import { colours } from "@Theme/colours";

type ConfirmBoxProps = {
  title: string
  message: string
  confirmFunc: () => void
};

const shadowStyle = {
  shadowColor: Platform.OS === "ios" ? "black" : "#0000007f",
  shadowOffset: { width: 5, height: 5 },
  shadowOpacity: 0.13,
  shadowRadius: 9.8,
  elevation: 8,
};

export default function ConfirmBox({title, message, confirmFunc}: ConfirmBoxProps) {
  const { colorScheme } = useColorScheme();
  
  const isLight = colorScheme === "light";

  return (
    <View
      className="flex-col justify-evenly w-[60%] h-[15%] bg-background-200 dark:bg-dark-background-200 rounded-[20]"
      style={shadowStyle}
    >
      <View className="justify-center w-full h-[60%] items-center border-b-hairline border-b-text-200 dark:border-b-dark-text-400">
        <Text className="font-bold text-[17px] text-text dark:text-dark-text">{title}</Text>
        <Text className="text-[13px] text-text dark:text-dark-text text-center">{message}</Text>
      </View>
      <View className="items-center w-full h-[40%]">
        <TouchableHighlight
          className="w-full rounded-b-[20]"
          onPress={() => confirmFunc()}
          underlayColor={isLight ? colours.background[400] : colours.dark.background[50]}
        >
          <View className="h-full justify-center bg-accent-200 dark:bg-dark-accent-200 rounded-b-[20]">
            <Text className="text-center text-accent-700 dark:text-dark-accent-700">Confirm</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}
