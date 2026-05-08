import { View, Text, Pressable } from "react-native";
import { Footprints } from "lucide-react-native";
import { FitnessGoal } from "@/src/types/TypesForWalkPlanner";

interface GoalCardProps {
  goal: FitnessGoal;
  width?: number;
  onPress?: (id: string) => void;
}

export const GoalCard = ({ goal, width, onPress }: GoalCardProps) => {
  const currentFormatted = goal.current.toLocaleString();
  const targetFormatted = goal.target.toLocaleString();

  return (
    <View className="px-4 py-2" style={{ width }}>
      <Text className="text-xl font-medium text-black mb-3 ml-1">
        {goal.label}
      </Text>

      <Pressable
        onPress={() => onPress?.(goal.id)}
        className="flex-row items-center active:opacity-80"
      >
        <View className="w-20 h-20 rounded-full bg-[#1A240C] items-center justify-center mr-5">
          <Footprints size={40} color="#ADFF2F" strokeWidth={2.5} />
        </View>

        <View className="flex-1 justify-center">
          <Text className="text-3xl font-normal text-black leading-tight">
            {currentFormatted} / {targetFormatted}
          </Text>
          <Text className="text-2xl font-normal text-black leading-tight">
            {goal.unit}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};