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
  
  const CARD_WIDTH = windowWidth * 0.75; 

  if (!goals || goals.length === 0) return (<View><Text>No Fitness Goals</Text></View>)

  return (
    <View className="mt-6 mb-4 ">
        <Text className="text-xl font-bold text-text dark:text-dark-text px-4 mb-3">My Fitness Goals</Text>
      <ProgressBar goal={goals[0]}/>
      <GoalCard goal={goals[1]} width={CARD_WIDTH} onPress={()=>console.log('Fitness Goal Clicked')} />
    </View>
  );
};