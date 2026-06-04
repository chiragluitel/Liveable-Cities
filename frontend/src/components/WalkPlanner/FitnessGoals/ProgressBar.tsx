import { View, Text } from "react-native";
import { FitnessGoal } from "@/src/types/walkPlannerTypes";

interface ProgressBarProps {
  goal: FitnessGoal;
}

export const ProgressBar = ({ goal }: ProgressBarProps) => {
  // Calculate percentage for the bar width
  const percentage = Math.min(100, (goal.current / goal.target) * 100);
  const remaining = Math.max(0, goal.target - goal.current).toFixed(1);

  return (
    <View className="w-full px-4 py-2">
      {/* Title Header */}
      <Text className="text-xl font-medium text-text dark:text-dark-text mb-2 ml-1">
        {goal.label}
      </Text>

      <View className="h-12 w-full bg-background-50 dark:bg-dark-background-100 border-2 border-text dark:border-dark-text-300 rounded-full overflow-hidden justify-center px-1">
        
        <View 
          className="h-9 bg-accent-300 dark:bg-dark-accent-400 rounded-full" 
          style={{ width: `${percentage}%` }} 
        />
      </View>

      <Text className="text-l font-normal text-text dark:text-dark-text text-center mt-3">
        {goal.current} {goal.unit}s done. {remaining} {goal.unit}s to go!
      </Text>
    </View>
  );
};