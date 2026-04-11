import { navigate } from "expo-router/build/global-state/routing";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
<Pressable 
  className="bg-blue-600 px-6  py-4 rounded-2xl  items-center  justify-center shadow-lg cursor-pointer"
  onPress={() => navigate('/(apps)/walkplanner')}
>
  <Text className="text-white text-xl font-bold">
    Get To Walk Planner
  </Text>
</Pressable>
    </View>
  );
}
