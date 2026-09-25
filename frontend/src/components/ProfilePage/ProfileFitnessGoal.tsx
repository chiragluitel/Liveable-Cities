import { View, Text } from "react-native";
import Dropdown from "../Dropdown/Dropdown";
import DropdownItem from "../Dropdown/DropdownItem";
import { useSettings } from "@/src/context/SettingsContext";

export default function ProfilePage() {
    const { setWalkGoal } = useSettings();

    return (
        <View className="mt-8 bg-background-100 dark:bg-dark-background-100 rounded-2xl p-5">
            
            <Text className="text-xl font-semibold text-text dark:text-dark-text">
                Fitness Goals
            </Text>

            <Dropdown title="Weekly Distance (km)" valueKey="walkGoal" initialSelected="5" actionFunc={setWalkGoal}>
                <DropdownItem title="5km" value="5" />
                <DropdownItem title="10km" value="10" />
                <DropdownItem title="20km" value="20" />
                <DropdownItem title="30km" value="30" />
                <DropdownItem title="40km" value="40" hideSeperator={true} />
            </Dropdown>
        </View>
    );
}