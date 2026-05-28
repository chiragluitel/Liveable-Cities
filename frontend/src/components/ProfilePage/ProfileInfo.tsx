import {View, Text} from "react-native";

interface ProfileInfoProps {
  name: string;
  email: string;
}

const ProfileInfo = ({name, email}: ProfileInfoProps) => {
  return (
    <View className="bg-background-100 dark:bg-dark-background-100 p-5 rounded-2xl gap-y-2">
      <Text className="text-lg text-text dark:text-dark-text">
        Name: {name}
      </Text>

      <Text className="text-lg text-text dark:text-dark-text">
        Email: {email}
      </Text>
    </View>
  );
};

export default ProfileInfo;