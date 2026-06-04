import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import useAsyncStorage from "@/src/hooks/useAsyncStorage";
import Dropdown from "../Dropdown/Dropdown";
import DropdownItem from "../Dropdown/DropdownItem";
import SettingsGroup from "../Settings/SettingsGroup";
import { useSettings } from "@/src/context/SettingsContext";

export default function ProfilePage() {
    const { setDistGoal, setStepGoal } = useSettings();

    return (
        <View className="mt-8 bg-background-100 dark:bg-dark-background-100 rounded-2xl p-5">
            
            <Text className="text-xl font-semibold text-text dark:text-dark-text">
                Fitness Goals
            </Text>

            <Dropdown title="Weekly Distance (km)" valueKey="distGoal" initialSelected="5" actionFunc={setDistGoal}>
                <DropdownItem title="5km" value="5" />
                <DropdownItem title="10km" value="10" />
                <DropdownItem title="20km" value="20" />
                <DropdownItem title="30km" value="30" />
                <DropdownItem title="40km" value="40" hideSeperator={true} />
            </Dropdown>

            <Dropdown title="Daily Steps" valueKey="stepsGoal" initialSelected="5000" hideSeperator={true} actionFunc={setStepGoal}>
                <DropdownItem title="3,000" value="3000" />
                <DropdownItem title="5,000" value="5000" />
                <DropdownItem title="7,500" value="7500" />
                <DropdownItem title="10,000" value="10000" />
                <DropdownItem title="12,500" value="12500" />
                <DropdownItem title="15,000" value="15000" hideSeperator={true} />
            </Dropdown>
        </View>
    );
}