import { View, Text, TextInput } from "react-native";
import { useState } from "react";

export default function ProfilePage() {
    const [weeklyGoal, setWeeklyGoal] = useState("");

    return (
        <View className="flex-1 bg-white p-5">

            {/* goal section */}
            <View className="mt-8 bg-gray-100 rounded-2xl p-5">
                
                <Text className="text-xl font-semibold text-black">
                    Weekly Fitness Goal
                </Text>

                <Text className="text-gray-600 mt-2">
                    How many kilometres do you plan to walk this week?
                </Text>

                {/* user input box */}
                <View className="flex-row items-center border border-gray-300 rounded-xl mt-5 px-4 bg-white">
                
                    <TextInput
                        className="flex-1 py-4 text-lg"
                        placeholder="Enter goal"
                        keyboardType="numeric"
                        value={weeklyGoal}
                        onChangeText={(text) => {
                        const cleaned = text.replace(/[^0-9]/g, "");
                        setWeeklyGoal(cleaned);
                        }}
                    />

                    <Text className="text-gray-500 text-lg">
                        km
                    </Text>
                </View>

                {/* display goal */}
                <View className="mt-5 bg-green-900 rounded-xl p-4">
                    <Text className="text-white text-lg font-semibold">
                        Your weekly goal:
                    </Text>

                    <Text className="text-white text-3xl font-bold mt-1">
                        {weeklyGoal || "0"} km
                    </Text>
                </View>

            </View>

        </View>
    );
}