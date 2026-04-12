import {View, Text} from "react-native";

interface ProfileHeaderProps {
    name: string;
}

const ProfileHeader = ({name}: ProfileHeaderProps) => {
    return (
        <View className="mt-8 mb-6">
            <Text className="text-3xl font-bold">
                Your Profile
            </Text>

            <Text className="text-gay-400 mt-1">
                Welcome back, {name}
            </Text>
        </View>
    );
};

export default ProfileHeader;