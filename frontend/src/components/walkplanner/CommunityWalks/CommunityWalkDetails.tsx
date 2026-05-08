import { Walk } from "@/src/types/TypesForWalkPlanner";
import { Text, View } from "react-native";

interface CommunityWalkDetailsProps {
    walk: Walk
}

export const CommunityWalkDetails = ({ walk }: CommunityWalkDetailsProps) => {
  return (
    <View className="flex-1 ml-3">
      <Text className="text-base font-bold text-gray-900 dark:text-white" numberOfLines={1}>
        {walk.title}
      </Text>
      <Text className="text-sm text-gray-500 mb-1" numberOfLines={1}>
        {walk.subtitle}
      </Text>

      <Text className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-2">
        {walk.distanceKm} km • {walk.durationMin} min
      </Text>
      
        {/* Tag Section  */}
      <View className="flex-row flex-wrap gap-1.5">
        {walk.tags.map((tag) => (
          <View 
            key={tag} 
            className="bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-1"
          >
            <Text className="text-[10px] font-semibold text-gray-600 dark:text-gray-300 uppercase">
              {tag}
            </Text>
          </View>
        ))}
      </View>

        {/* Rating Section */}
      <View className="flex-row items-center mt-2">
        <Text className="text-yellow-500 text-xs mr-1">★</Text>
        <Text className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {walk.rating}
        </Text>
        <Text className="text-xs text-gray-400 dark:text-gray-500 ml-1">
          ({walk.reviewCount})
        </Text>
      </View>


    </View>
  );
}