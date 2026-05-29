import { Text, View } from "react-native";

interface GreetComponentProps {
  username: string;
}

export const GreetComponent = ({username}:GreetComponentProps) => {
  return (
    <View className="gap-y-1">
      <Text className="text-4xl font-bold text-text dark:text-dark-text"> Hello, {username} </Text>
      <Text className="text-4xl font-light text-text-700 dark:text-dark-text-700"> Welcome to Casey </Text>
    </View>
  )
}