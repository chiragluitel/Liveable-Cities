import { router } from "expo-router";
import { Pressable, Text, View } from "react-native"

const PermitsHomePage = () => {
    return (
        <View>
            <Text> Welcome to Permits Home Page </Text>
            <Pressable onPress={() => {router.navigate('/(apps)/permits/MyPermits')}}> 
                <Text> Navigate To My Permits by clicking here </Text>
            </Pressable> 
        </View>
    )
}

export default PermitsHomePage;