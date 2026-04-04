import type { LucideIcon } from "lucide-react-native";
import { Pressable } from "react-native";
import { NavIcon } from "./NavIcon";

interface NavButtonProps {
    routeTo: string;
    onPress: ()=>void;
    isFocused: boolean;
    buttonLabel: string;
    Icon: React.ReactNode;
}

const NavButton = ({routeTo, onPress, isFocused, buttonLabel, Icon}: NavButtonProps) => {
    return (
        <Pressable
            key = {routeTo}
            onPress={onPress}
            className="flex-1 items-center"
            accessibilityRole="button"
            accessibilityState={isFocused? {selected:true} :{}}
        >
            <NavIcon 
                label = {buttonLabel}
                Icon={Icon}
                isFocused={isFocused}
            />
        </Pressable>
    )
}
export default NavButton