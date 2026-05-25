import { View, Text, TextInput } from "react-native";
import { useState } from "react";

export default function ProfilePage() {
    const [weeklyGoal, setWeeklyGoal] = useState("");

    return (
        <View className="mt-8 bg-background-100 dark:bg-dark-background-100 rounded-2xl p-5">
            
            <Text className="text-xl font-semibold text-text dark:text-dark-text">
                Weekly Fitness Goal
            </Text>

            <Text className="text-text-600 dark:text-dark-text-800 mt-2">
                How many kilometres do you plan to walk this week?
            </Text>

            {/* user input box */}
            <View className="flex-row items-center border border-text-300 dark:border-text-800 rounded-xl mt-5 px-4 bg-accent-50 dark:bg-dark-accent-200">
            
                <TextInput
                    className="flex-1 py-4 text-lg text-text dark:text-dark-text"
                    placeholder="Enter goal"
                    keyboardType="numeric"
                    value={weeklyGoal}
                    onChangeText={(text) => {
                    const cleaned = text.replace(/[^0-9]/g, "");
                    setWeeklyGoal(cleaned);
                    }}
                />

                <Text className="text-text-500 dark:text-dark-text-500 text-lg">
                    km
                </Text>
            </View>

            {/* display goal */}
            <View className="mt-5 bg-accent-300 dark:bg-accent-700 rounded-xl p-4">
                <Text className="text-dark-text dark:text-dark-text text-lg font-semibold">
                    Your weekly goal:
                </Text>

                <Text className="text-dark-text dark:text-dark-text text-3xl font-bold mt-1">
                    {weeklyGoal || "0"} km
                </Text>
            </View>

        </View>
    );
}