import { Platform, Text, TouchableHighlight, View } from "react-native";

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
  return (
    <View
      className="flex-col justify-evenly w-[60%] h-[15%] bg-white rounded-[20]"
      style={shadowStyle}
    >
      <View className="justify-center w-full h-[60%] items-center border-b-hairline border-b-[#C7C7CC]">
        <Text className="font-bold text-[17px]">{title}</Text>
        <Text className="text-[13px]">{message}</Text>
      </View>
      <View className="items-center w-full h-[40%]">
        <TouchableHighlight
          className="w-full rounded-b-[20]"
          onPress={() => confirmFunc()}
          underlayColor="#747480"
        >
          <View className="h-full justify-center bg-white rounded-b-[20]">
            <Text className="text-center text-[#007BFE]">Confirm</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}
