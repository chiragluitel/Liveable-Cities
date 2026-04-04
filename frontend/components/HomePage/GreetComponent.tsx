import { Text, View } from "react-native";

interface GreetComponentProps {
    username: string;
}

export const GreetComponent = ({username}:GreetComponentProps) => {
    return (
        <View>
            <Text> Hello, {username} </Text>
            <Text> Welcome to Casey Smart Hub </Text>
        </View>
    )
}