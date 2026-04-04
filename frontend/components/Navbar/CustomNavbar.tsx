import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";
import { NavIcon } from "./NavIcon";
import { useTabNavigation } from "@/hooks/Navigation/useTabNavigation";
import NavButton from "./NavButton";

export const CustomNavbar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const {handleTabPress} = useTabNavigation(navigation);

    return (
        <View className="flex-row items-center justify-around bg-white px-4 pt-3 pb-8 border-t border-gray-200 shadow-sm">
            {/* Loop over each component */}
            {state.routes.map((route, index) => {
                // Extract key Info from options, like label, color, icon
                const { options } = descriptors[route.key];
                const label = options.title !== undefined ? options.title : route.name;
                const isFocused = state.index === index;
                
                const activeColor = '#007AFF'; 
                const inactiveColor = '#8E8E93'; 
                const currentColor = isFocused ? activeColor : inactiveColor;
                
                const iconNode = options.tabBarIcon 
                    ? options.tabBarIcon({ focused: isFocused, color: currentColor, size: 28 }) 
                    : null;

                if (!iconNode) return null;

                return (
                    <NavButton 
                        key={route.key}
                        routeTo={route.key}
                        buttonLabel={label}
                        Icon={iconNode}
                        isFocused={isFocused}
                        onPress={() => handleTabPress(route, isFocused)}
                    />
                );
            })}
        </View>
    );
};