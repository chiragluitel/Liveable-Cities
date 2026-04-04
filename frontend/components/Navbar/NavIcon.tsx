import { Text, TouchableOpacity, View } from "react-native"
import type {LucideIcon} from 'lucide-react-native'

interface NavIconProps {
    label: string,
    Icon: React.ReactNode;
    isFocused: boolean;
}

export const NavIcon = ({label, Icon, isFocused}: NavIconProps) => {
    const activeColor = '#007AFF';
    const inactiveColor = '#8E8E93';
    const currentColor = isFocused ? activeColor : inactiveColor;
    return (
        <View className="items-center justify-center gap-1">
            {Icon}
            <Text className="text-[10px] font-medium" style={{color: currentColor}}> {label} </Text>
        </View>
    )
}