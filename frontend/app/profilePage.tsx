import {View, Text, Pressable} from "react-native";
import {useRouter} from "expo-router";
import ProfileHeader from "../components/ProfilePage/ProfileHeader";
import ProfileInfo from "../components/ProfilePage/ProfileInfo";
import ProfileActions from "../components/ProfilePage/ProfileActions";

export default function ProfilePage() {
    const router = useRouter();

    const user = {
        name: "Crystal",
        email: "crystal@gmail.com"
    };

    return (
        <View className="flex-1 bg-white px-5 pt-12">
            <ProfileHeader name={user.name} />

            <ProfileInfo
                name={user.name}
                email={user.email}
            />

            <ProfileActions onBack={() => router.back()} />
        </View>
    );
};