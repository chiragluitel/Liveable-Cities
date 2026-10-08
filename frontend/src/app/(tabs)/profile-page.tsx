import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProfileHeader from "@Components/ProfilePage/ProfileHeader";
import ProfileInfo from "@Components/ProfilePage/ProfileInfo";
import ProfileFitnessGoal from "@/src/components/ProfilePage/ProfileFitnessGoal";
import { useCustomWalks } from "@/src/context/CustomWalkContext";
import { useSettings, WalkingSpeed } from "@/src/context/SettingsContext";
import { FitnessGoal } from "@/src/types/walkPlannerTypes";
import WeatherWidget from "@/src/components/HomePage/Weather/WeatherWidget";
import { FitnessSection } from "@/src/components/WalkPlanner/FitnessGoals/FitnessSection";
import SettingsGroup from "@/src/components/Settings/SettingsGroup";
import Dropdown from "@/src/components/Dropdown/Dropdown";
import DropdownItem from "@/src/components/Dropdown/DropdownItem";


export default function ProfilePage() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const { refreshWalks } = useCustomWalks();
  const { walkingSpeed, setWalkingSpeed, setWalkGoal, walkGoal, weeklyWalks } = useSettings();

  useFocusEffect(
    useCallback(() => {
      checkLogin();
    }, [])
  );

  const checkLogin = async () => {
    const loginStatus = await AsyncStorage.getItem("loggedIn");
    const storedUsername = await AsyncStorage.getItem("username");

    setLoggedIn(loginStatus === "true");
    setUsername(storedUsername ?? "");

    refreshWalks();
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("loggedIn");
    await AsyncStorage.removeItem("username");

    setLoggedIn(false);
    setUsername("");
    refreshWalks();
  };

  // Wait while checking AsyncStorage
  if (loggedIn === null) {
    return null;
  }

  // is use is logged in, display username, else Guest
  const user = {
    name: loggedIn? username : "Guest",
    email: "",
  };

  const fitnessGoals: FitnessGoal[] = [
      {
          id: 'g1',
          label: 'Weekly Walks',
          unit: 'walks',
          current: Number(weeklyWalks),
          target: Number(walkGoal)
      },
  ]

  return (
    <View className="flex-1 w-full bg-background-50 dark:bg-dark-background-50 pt-12">
      <ProfileHeader name={user.name} />
      <ScrollView contentContainerStyle={{alignItems: "center"}}>

        <WeatherWidget />

        <ProfileInfo
          name={user.name}
          email={user.email}
        />

        <FitnessSection goals={fitnessGoals} />

        <SettingsGroup title="Fitness Goals">
          <Dropdown title="Weekly Walk Goal" valueKey="walkGoal" initialSelected="5" actionFunc={setWalkGoal}  hideSeperator={true}>
              <DropdownItem title="5 walks" value="5" />
              <DropdownItem title="10 walks" value="10" />
              <DropdownItem title="15 walks" value="15" />
              <DropdownItem title="20 walks" value="20" />
              <DropdownItem title="25 walks" value="25" />
              <DropdownItem title="30 walks" value="30" />
              <DropdownItem title="35 walks" value="35" />
              <DropdownItem title="40 walks" value="40" hideSeperator={true} />
          </Dropdown>
        </SettingsGroup>

        <SettingsGroup title="Preferences">
          <Dropdown title="Walking Speed" valueKey="walkSpeed" initialSelected={walkingSpeed} hideSeperator={true} actionFunc={(value: string) => setWalkingSpeed(value as WalkingSpeed)}>
            <DropdownItem title="Slow (2km/h)" value="Slow" />
            <DropdownItem title="Average (4km/h)" value="Average" />
            <DropdownItem title="Fast (6km/h)" value="Fast" hideSeperator={true} />
          </Dropdown>
        </SettingsGroup>

        {/* logout option if the user is logged in only */}
        {loggedIn && (
          <TouchableOpacity
            onPress={handleLogout}
            className="w-[90%] mt-6 mb-5 bg-gray-500 rounded-lg py-4 items-center"
          >
            <Text className="text-white font-bold">
              Log out
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}