import { Walk } from "@/src/types/walkPlannerTypes";
import { Text, View } from "react-native";

interface CommunityWalkDetailsProps {
    walk: Walk
}

export const CommunityWalkDetails = ({ walk }: CommunityWalkDetailsProps) => {
  return (
    <View className="flex-1 ml-3">
      <Text className="text-base font-bold text-text dark:text-dark-text" numberOfLines={1}>
        {walk.title}
      </Text>
      <Text className="text-sm text-text-600 dark:text-dark-text-600 mb-1" numberOfLines={1}>
        {walk.subtitle}
      </Text>

      <Text className="text-xs text-text-600 dark:text-dark-text-400 font-medium mb-2">
        {walk.distanceKm} km • {walk.durationMin} min
      </Text>
      
        {/* Tag Section  */}
      <View className="flex-row flex-wrap gap-1.5">
        {walk.tags.map((tag) => (
          <View 
            key={tag} 
            className="bg-primary-50 dark:bg-dark-primary-300 rounded-md px-2 py-1"
          >
            <Text className="text-[10px] font-semibold text-text-600 dark:text-dark-text-600 uppercase">
              {tag}
            </Text>
          </View>
        ))}
      </View>

        {/* Rating Section */}
      <View className="flex-row items-center mt-2">
        <Text className="text-yellow-500 text-xs mr-1">★</Text>
        <Text className="text-xs font-medium text-text-600 dark:text-dark-text-600">
          {walk.rating}
        </Text>
        <Text className="text-xs text-text-400 dark:text-dark-text-500 ml-1">
          ({walk.reviewCount})
        </Text>
      </View>


    </View>
  );
}