import CustomButtonComponent from "@/components/Shared/CustomButtonComponent";
import { router, Stack } from "expo-router"
import { Pressable, Text } from "react-native";

const PermitsLayout = () => {
    return (
        <Stack screenOptions={{headerShown: true}}> 
            <Stack.Screen name="index" options={{ title: 'Permits', headerLeft: () => <CustomButtonComponent label="Close" onClick={()=>router.back()}/>}} />
            <Stack.Screen name="MyPermits/index" options={{title: 'My Permits'}} />
            <Stack.Screen name="MyPermits/[permitID]" options={{title: 'Permit Details'}} />
            <Stack.Screen name="MyPermits/AddPermit" options={{title: 'Add Permit'}} />
        </Stack>
    )
}

export default PermitsLayout;