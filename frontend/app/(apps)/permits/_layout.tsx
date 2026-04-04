import { Stack } from "expo-router"

const PermitsLayout = () => {
    return (
        <Stack screenOptions={{headerShown: true}}> 
            <Stack.Screen name="index" options={{title: "Permits"}} />
        </Stack>
    )
}

export default PermitsLayout;