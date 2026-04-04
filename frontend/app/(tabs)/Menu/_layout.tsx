import { Stack } from "expo-router"

const MenuLayout = () => {
    return (
        <Stack screenOptions={ {headerShown: false }}>
            <Stack.Screen name="index"/>
        </Stack>
    )
}

export default MenuLayout