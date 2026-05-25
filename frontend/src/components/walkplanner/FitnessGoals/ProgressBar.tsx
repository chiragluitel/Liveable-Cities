import { View, Text } from "react-native";
import { FitnessGoal } from "@/src/types/TypesForWalkPlanner";

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
      <Text className="text-xl font-medium text-black mb-2 ml-1">
        {goal.label}
      </Text>

      <View className="h-12 w-full bg-white border-2 border-black rounded-full overflow-hidden justify-center px-1">
        
        <View 
          className="h-9 bg-[#32CD63] rounded-full" 
          style={{ width: `${percentage}%` }} 
        />
      </View>

      <Text className="text-l font-normal text-black text-center mt-3">
        {goal.current} {goal.unit}s done. {remaining} {goal.unit}s to go!
      </Text>
    </View>
  );
};