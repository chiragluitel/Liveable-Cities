import {useRouter} from "expo-router";
import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native";
import FeatureCard from "@Components/HomePage/FeatureCard";
import HomeHeader from "@Components/HomePage/HomeHeader";

export default function HomePage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-5 pt-12">
      {/* header */}
      <HomeHeader />

      {/* content */}
      <View className="gap-y-4">
        {/* walk planner app */}
        <FeatureCard
          title="Smart Walk Planner"
          description="Plan your walks tailored to your needs"
          buttonText="Plan a Walk"
          onPress={() => console.log("Navigate to walk planner")}
        />

        {/* Coming Soon Box */}
        <View className="mt-6 border border-dashed border-gray-400 rounded-2xl p-8 items-center">
          <Text className="text-gray-500 font-semibold">
            More features coming soon
          </Text>

          <Text className="text-gray-400 text-sm mt-1">
            Stay tuned
          </Text>
        </View>
      </View>

      <StatusBar style="dark" />
    </View>
  );
}