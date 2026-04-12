import { Platform, StyleSheet, Text, TouchableHighlight, View } from "react-native";

type AlertBoxProps = {
  title: string
  message: string
  cancelFunc: Function
  confirmFunc: Function
};

export default function AlertBox({
  title = "{title}", 
  message = "{message}", 
  cancelFunc, 
  confirmFunc
}: AlertBoxProps) {
  return (
    <View 
      className="flex-col justify-evenly w-[60%] h-[15%] bg-white rounded-[20]" 
      style={styles.contentShadow}
    >
      <View className="justify-center w-full h-[60%] items-center border-b-hairline border-b-[#C7C7CC]">
        <Text style={{fontWeight: "bold", fontSize: 17}}>{title}</Text>
        <Text style={{fontSize: 13}}>{message}</Text>
      </View>
      <View className="items-center w-full h-[40%] flex-row justify-evenly">
        <TouchableHighlight 
          className="w-[50%] rounded-bl-[20]"
          onPress={() => cancelFunc()}
          underlayColor="#747480"
        >
          <View className="h-full justify-center bg-white rounded-bl-[20] border-r-hairline border-r-[#C7C7CC]">
            <Text style={{textAlign: "center", color: "#007BFE"}}>Cancel</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          className="w-[50%] rounded-br-[20]"
          onPress={() => confirmFunc()}
          underlayColor="#747480"
        >
          <View className="h-full justify-center bg-white rounded-br-[20]">
            <Text style={{textAlign: "center", color: "#FF382B"}}>Confirm</Text>
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