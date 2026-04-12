import { Text, View, useWindowDimensions } from "react-native";
import { FitnessGoal } from "@/src/types/TypesForWalkPlanner";
import { ClickableHeader } from "@Components/shared/ClickableHeader";
import { GoalCard } from "./GoalCard";
import { FITNESS_GOALS } from "@/src/database/MockDB";
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
      <ClickableHeader header="My Fitness Goals" onHeaderPress={() => onHeaderPress?.()} />
      <ProgressBar goal={FITNESS_GOALS[0]}/>
      <GoalCard goal={FITNESS_GOALS[1]} width={CARD_WIDTH} onPress={()=>console.log('Fitness Goal Clicked')} />
    </View>
  );
};