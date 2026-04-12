import { Text, View } from "react-native";

interface GreetComponentProps {
    username: string;
}

export const GreetComponent = ({username}:GreetComponentProps) => {
    return (
        <View className="gap-y-1">
            <Text className="text-4xl font-bold text-black"> Hello, {username} </Text>
            <Text className="text-4xl font-light text-gray-500"> Welcome to Casey </Text>
        </View>
    )
}