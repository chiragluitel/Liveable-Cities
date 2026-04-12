import {View, Text} from "react-native";

interface ProfileInfoProps {
    name: string;
    email: string;
}

const ProfileInfo = ({name, email}: ProfileInfoProps) => {
    return (
        <View className="bg-gray-100 p-5 rounded-2xl gap-y-2">
            <Text className="text-lg">
                Name: {name}
            </Text>

            <Text className="text-lg">
                Email: {email}
            </Text>

        </View>
    );
};

export default ProfileInfo;