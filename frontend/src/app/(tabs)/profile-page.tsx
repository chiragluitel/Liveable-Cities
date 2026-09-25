import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProfileHeader from "@Components/ProfilePage/ProfileHeader";
import ProfileInfo from "@Components/ProfilePage/ProfileInfo";
import ProfileFitnessGoal from "@/src/components/ProfilePage/ProfileFitnessGoal";
import LoginPage from "../login-page";


export default function ProfilePage() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const loginStatus = await AsyncStorage.getItem("loggedIn");
    const storedUsername = await AsyncStorage.getItem("username");

    setLoggedIn(loginStatus === "true");

    if (storedUsername) {
      setUsername(storedUsername);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("loggedIn");
    await AsyncStorage.removeItem("username");

    setLoggedIn(false);
    setUsername("");
  };

  // Wait while checking AsyncStorage
  if (loggedIn === null) {
    return null;
  }

  // User is not logged in
  if (!loggedIn) {
    return <LoginPage onLogin={checkLogin} />;
  }

  // User is logged in
  const user = {
    name: username,
    email: "",
  };

  const { 
    walkingSpeed, setWalkingSpeed, setWalkGoal, walkGoal, weeklyWalks
  } = useSettings();
  
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

      <ProfileFitnessGoal />

      <Pressable
        onPress={handleLogout}
        className="mt-6 bg-gray-500 rounded-lg py-4 items-center"
      >
        <Text className="text-white font-bold">
          Log out
        </Text>
      </Pressable>

    </View>
  );
}