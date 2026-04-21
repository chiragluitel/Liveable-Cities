import {useRouter} from "expo-router";
import { StatusBar } from "expo-status-bar"
import { Text, View, ScrollView } from "react-native";
import FeatureCard from "@Components/HomePage/FeatureCard";
import HomeHeader from "@Components/HomePage/HomeHeader";

export default function HomePage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background-50 dark:bg-dark-background-50 px-5 pt-12">
      {/* header */}
      <HomeHeader />

      <ScrollView>
        {/* content */}
        <View className="gap-y-4 pb-[20]">
          {/* walk planner app */}
          <FeatureCard
            title="Smart Walk Planner"
            description="Plan your walks tailored to your needs"
            buttonText="Plan a Walk"
            onPress={() => router.navigate('/walkplanner')}
          />
          
          {/* Coming Soon Box */}
          <View className="mt-6 border border-dashed border-gray-400 rounded-2xl p-8 items-center">
            <Text className="text-text-500 dark:text-dark-text-500 font-semibold">
              More features coming soon
            </Text>

            <Text className="text-text-400 dark:text-dark-text-400 text-sm mt-1">
              Stay tuned
            </Text>
          </View>
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}