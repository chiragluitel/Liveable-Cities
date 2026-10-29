import { Text, View } from "react-native";

interface GreetComponentProps {
  username?: string | null;
}

export const GreetComponent = ({username}:GreetComponentProps) => {
  return (
    <View className="gap-y-1">
      {username ? (
        <>
          <Text className="text-4xl font-bold text-text dark:text-dark-text"> Hello, {username} </Text>
          <Text className="text-4xl font-light text-text-700 dark:text-dark-text-700"> Welcome to Casey </Text>
        </>
      ) : (
        <>
          <Text className="text-4xl font-bold text-text dark:text-dark-text"> Welcome to Casey </Text>
          <Text className="text-2xl font-light text-text-700 dark:text-dark-text-700"> Log in to unlock all features </Text>
        </>
      )}
    </View>
  )
}
