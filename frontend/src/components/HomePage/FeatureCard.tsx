import {View, Text, Pressable} from "react-native";

interface FeatureCardProps {
  title: string;
  description: string;
  buttonText: string;
  onPress?: () => void;
}

const FeatureCard = ({
  title,
  description,
  buttonText,
  onPress,
  }: FeatureCardProps) => {
  return (
    <View className="mt-6 rounded-2xl p-5 bg-secondary-400 dark:bg-secondary-700">
      <Text className="text-text dark:text-dark-text text-lg font-bold">
        {title}
      </Text>

      <Text className="text-text-800 dark:text-dark-text-800 text-sm mt-1">
        {description}
      </Text>

      <Pressable
        onPress={onPress}
        className="mt-4 self-start bg-accent-200 dark:bg-accent-500 px-4 py-2 rounded-full"
      >
        <Text className="text-text dark:text-dark-text font-semibold">
          {buttonText} -&gt;
        </Text>
      </Pressable>
    </View>
  );
};

export default FeatureCard;