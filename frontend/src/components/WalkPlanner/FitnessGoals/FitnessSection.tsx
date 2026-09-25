import { Text, View, useWindowDimensions } from "react-native";
import { FitnessGoal } from "@/src/types/walkPlannerTypes";
import { GoalCard } from "./GoalCard";
import { ProgressBar } from "./ProgressBar";

interface FitnessSectionProps {
  goals: FitnessGoal[];
  onHeaderPress?: () => void;
  onGoalPress?: (goalId: string) => void;
}

export const FitnessSection = ({ goals, onHeaderPress, onGoalPress }: FitnessSectionProps) => {
  const { width: windowWidth } = useWindowDimensions();
  
  const CARD_WIDTH = windowWidth; 

  if (!goals || goals.length === 0) return (<View><Text>No Fitness Goals</Text></View>)

  return (
    <View className="mt-6 mb-4 w-[90%]">
      <GoalCard goal={goals[0]} width={CARD_WIDTH} onPress={()=>console.log('Fitness Goal Clicked')} />
    </View>
  );
};