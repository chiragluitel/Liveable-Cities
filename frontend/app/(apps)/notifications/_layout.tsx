import { router, Stack } from "expo-router"
import { Pressable, Text } from "react-native";

const NotificationsPageLayout = () =>{

    return (
        <Stack screenOptions={{headerShown: true, headerTitleStyle:{fontWeight:'bold'}}}>
            <Stack.Screen 
                name="index" 
                options={{
                    title: 'Notification Service',
                    headerLeft: () => (
                    <Pressable onPress={() => router.back()}>
                        <Text className="">Close</Text>
                    </Pressable>
                    ),
                }} 
                />
            <Stack.Screen  name="subscribe" options={{title: 'Subscribe'}} />
        </Stack>
    )
}

export default NotificationsPageLayout;