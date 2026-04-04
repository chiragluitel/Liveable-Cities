import { router } from "expo-router";
import { Pressable, Text, View } from "react-native"

const NotificationsPage = () => {
    return (
        <View>
            <Text> This is Notifications Home Page </Text>
            <Pressable
            onPress={()=>router.navigate('/notifications/subscribe')}
            >
                <Text> Services </Text>
            </Pressable>
        </View>
    )
}

export default NotificationsPage;