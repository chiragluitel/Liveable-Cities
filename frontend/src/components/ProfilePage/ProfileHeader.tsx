import {View, Text} from "react-native";
import { GreetComponent } from "../HomePage/GreetComponent";

interface ProfileHeaderProps {
  name: string;
}

const ProfileHeader = ({name}: ProfileHeaderProps) => {
  return (
    <View className="flex-row justify-between items-start mb-2 px-2 pt-8">
      <GreetComponent username = "Test User" />
    </View>
  );
};

export default ProfileHeader;