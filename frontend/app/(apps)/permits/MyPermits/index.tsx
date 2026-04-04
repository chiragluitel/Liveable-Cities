import CustomButtonComponent from "@/components/Shared/CustomButtonComponent"
import { router } from "expo-router"
import { Pressable, Text, View } from "react-native"

const MyPermits = () => {
    return (
        <View> 
            <Text> Welcome to My Permits page </Text>
            
            <Pressable onPress={ () => router.navigate(`/(apps)/permits/MyPermits/${1}`)}>
                <Text> 1. Permit to build swimming pool </Text>
            </Pressable>

            <CustomButtonComponent label="Add Permit" onClick={()=>router.push('/(apps)/permits/MyPermits/AddPermit') } />

        </View>
    )
}

export default MyPermits