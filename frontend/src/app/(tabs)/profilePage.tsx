import {View} from "react-native";
import {useRouter} from "expo-router";
import ProfileHeader from "@Components/ProfilePage/ProfileHeader";
import ProfileInfo from "@Components/ProfilePage/ProfileInfo";

export default function ProfilePage() {
  const router = useRouter();

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

      {/*<ProfileActions onBack={() => router.back()} />*/}
    </View>
  );
};