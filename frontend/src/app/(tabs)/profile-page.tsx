import {View} from "react-native";
import ProfileHeader from "@Components/ProfilePage/ProfileHeader";
import ProfileInfo from "@Components/ProfilePage/ProfileInfo";
import ProfileFitnessGoal from "@/src/components/ProfilePage/ProfileFitnessGoal";

export default function ProfilePage() {

  const user = {
    name: "Test User",
    email: "test@gmail.com"
  };

  return (
    <View className="flex-1 bg-background-50 dark:bg-dark-background-50 px-5 pt-12">
      <ProfileHeader name={user.name} />

      <ProfileInfo
        name={user.name}
        email={user.email}
      />

      <ProfileFitnessGoal />
        
    </View>
  );
};