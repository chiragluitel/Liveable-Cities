import { useColorScheme } from "nativewind";
import { Platform, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { colors } from "@Theme/colours";

type AlertBoxProps = {
  title: string
  message: string
  cancelFunc: () => void
  confirmFunc: () => void
};

export default function AlertBox({title, message, cancelFunc, confirmFunc}: AlertBoxProps) {
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
      <View className="items-center w-full h-[40%] flex-row justify-evenly">
        <TouchableHighlight 
          className="w-[50%] rounded-bl-[20]"
          onPress={() => cancelFunc()}
          underlayColor={isLight ? colors.background[400] : colors.dark.background[50]}
        >
          <View className="h-full justify-center bg-accent-200 dark:bg-dark-accent-200 rounded-bl-[20] border-r-hairline border-b-text-200 dark:border-b-dark-text-400">
            <Text style={{textAlign: "center"}} className="text-accent-700 dark:text-dark-accent-700">Cancel</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          className="w-[50%] rounded-br-[20]"
          onPress={() => confirmFunc()}
          underlayColor={isLight ? colors.background[400] : colors.dark.background[50]}
        >
          <View className="h-full justify-center bg-warning-200 dark:bg-dark-warning-300 rounded-br-[20]">
            <Text style={{textAlign: "center"}} className="text-warning-600 dark:text-dark-warning-800">Confirm</Text>
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