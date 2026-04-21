import { useColorScheme } from "nativewind";
import { Platform, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { colors } from "@Theme/colours";

type ConfirmBoxProps = {
  title: string
  message: string
  confirmFunc: () => void
};

export default function ConfirmBox({title, message, confirmFunc}: ConfirmBoxProps) {
  const { colorScheme } = useColorScheme();
  
  const isLight = colorScheme === "light";

  return (
    <View 
      className="flex-col justify-evenly w-[60%] h-[15%] bg-background-200 dark:bg-dark-background-200 rounded-[20]" 
      style={styles.contentShadow}
    >
      <View className="justify-center w-full h-[60%] items-center border-b-hairline border-b-text-200 dark:border-b-dark-text-400">
        <Text style={{fontWeight: "bold", fontSize: 17}} className="text-text dark:text-dark-text">{title}</Text>
        <Text style={{fontSize: 13}} className="text-text dark:text-dark-text">{message}</Text>
      </View>
      <View className="items-center w-full h-[40%]">
        <TouchableHighlight 
          className="w-full rounded-b-[20]"
          onPress={() => confirmFunc()}
          underlayColor={isLight ? colors.background[400] : colors.dark.background[50]}
        >
          <View className="h-full justify-center bg-primary-200 dark:bg-dark-primary-200 rounded-b-[20]">
            <Text style={{textAlign: "center"}} className="text-accent-500 dark:text-dark-accent-700">Confirm</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentShadow: {
    shadowColor: Platform.OS === "ios" ? "black" : "#0000007f", // Make shadow lighter on Android
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.13,
    shadowRadius: 9.8,
    elevation: 8,
  },
});