import { Animated, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Footprints } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { colours } from "../theme/colours";
import { useEffect, useRef } from "react";

type WeeklyWalksNotifProps = {
    notifType: string,
    currentValue: number,
    goalValue: number,
    onFinish: () => void
}

export default function WeeklyWalksNotif({notifType, currentValue, goalValue, onFinish}: WeeklyWalksNotifProps) {
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const isLight = colorScheme === "light";

    const slideAnim = useRef(new Animated.Value(-150)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }),
            Animated.delay(notifType == "default" ? 2000 : 3000),
            Animated.timing(slideAnim, {
                toValue: -150,
                duration: 400,
                useNativeDriver: true
            }),
        ]).start(({ finished }) => {
            if (finished) {
                onFinish();
            }
        });
    }, []);

    return (
        <Animated.View 
            className="flex w-full absolute items-center z-200"
            style={{ 
                top: insets.top + 12,
                transform: [{ translateY: slideAnim }]
             }}
        >
            {notifType == "default" &&
                <View className="flex-row bg-background dark:bg-dark-background-600 p-3 rounded-[20px] items-center">
                    <Footprints size={35} color={isLight ? colours.accent[200] : colours.dark.accent[800]} strokeWidth={2.5} />
                    <Text className="pl-2 text-lg text-text dark:text-dark-text">{currentValue}/{goalValue} walks</Text>
                </View>
            }
            {notifType == "goalMet" &&
                <View className="flex bg-background dark:bg-dark-background-600 p-3 rounded-[20px] items-center">
                    <View className="flex-row items-center">
                        <Footprints size={35} color={isLight ? colours.accent[200] : colours.dark.accent[800]} strokeWidth={2.5} />
                        <Text className="pl-2 text-lg text-text dark:text-dark-text">{currentValue}/{goalValue} walks</Text>
                    </View>
                    <Text className="pl-2 text-lg text-text dark:text-dark-text">Your weekly walk goal has been met!</Text>
                </View>
            }
        </Animated.View>
    );
}