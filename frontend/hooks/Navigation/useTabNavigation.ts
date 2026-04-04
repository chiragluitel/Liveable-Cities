import { BottomTabBarProps } from "@react-navigation/bottom-tabs"

type NavigationType = BottomTabBarProps['navigation']
type RouteType = BottomTabBarProps['state']['routes'][0];
export const useTabNavigation = (navigation: NavigationType) => {

    const handleTabPress = (route: RouteType, isFocused: boolean) => {
        const event = navigation.emit ({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
        });

        if(!isFocused && !event.defaultPrevented){
            navigation.navigate(route.name, route.params);
        }
    }

    return {handleTabPress};

}