import {View, Text} from "react-native";
import { GreetComponent } from "../HomePage/GreetComponent";

interface ProfileHeaderProps {
  name: string;
}

const ProfileHeader = ({name}: ProfileHeaderProps) => {
  return (
    <View className="flex-row justify-between items-start mb-4 px-2 pt-8">
      <GreetComponent username = {name} />
    </View>
  );
};

export default ProfileHeader;