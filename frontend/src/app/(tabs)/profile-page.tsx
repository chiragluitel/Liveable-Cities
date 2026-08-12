import {ScrollView, View} from "react-native";
import ProfileHeader from "@Components/ProfilePage/ProfileHeader";
import ProfileInfo from "@Components/ProfilePage/ProfileInfo";
import ProfileFitnessGoal from "@/src/components/ProfilePage/ProfileFitnessGoal";
import { useSettings, WalkingSpeed } from "@/src/context/SettingsContext";
import SettingsGroup from "@/src/components/Settings/SettingsGroup";
import Dropdown from "@/src/components/Dropdown/Dropdown";
import DropdownItem from "@/src/components/Dropdown/DropdownItem";

export default function ProfilePage() {

  const user = {
    name: "Test User",
    email: "test@gmail.com"
  };

  const { 
    walkingSpeed, setWalkingSpeed, 
  } = useSettings();

  const { setDistGoal, setStepGoal } = useSettings();

  return (
    <View className="flex-1 w-full bg-background-50 dark:bg-dark-background-50">
      <ProfileHeader name={user.name} />

      <ProfileInfo
        name={user.name}
        email={user.email}
      />

      <ScrollView contentContainerStyle={{alignItems: "center"}}>
      <SettingsGroup title="Fitness Goals">
        <Dropdown title="Weekly Distance (km)" valueKey="distGoal" initialSelected="5" actionFunc={setDistGoal}>
            <DropdownItem title="5km" value="5" />
            <DropdownItem title="10km" value="10" />
            <DropdownItem title="20km" value="20" />
            <DropdownItem title="30km" value="30" />
            <DropdownItem title="40km" value="40" hideSeperator={true} />
        </Dropdown>

        <Dropdown title="Daily Steps" valueKey="stepsGoal" initialSelected="5000" hideSeperator={true} actionFunc={setStepGoal}>
            <DropdownItem title="3,000" value="3000" />
            <DropdownItem title="5,000" value="5000" />
            <DropdownItem title="7,500" value="7500" />
            <DropdownItem title="10,000" value="10000" />
            <DropdownItem title="12,500" value="12500" />
            <DropdownItem title="15,000" value="15000" hideSeperator={true} />
        </Dropdown>
      </SettingsGroup>

      <SettingsGroup title="Preferences">
        <Dropdown title="Walking Speed" valueKey="walkSpeed" initialSelected={walkingSpeed} hideSeperator={true} actionFunc={(value: string) => setWalkingSpeed(value as WalkingSpeed)}>
          <DropdownItem title="Slow (2km/h)" value="Slow" />
          <DropdownItem title="Average (4km/h)" value="Average" />
          <DropdownItem title="Fast (6km/h)" value="Fast" hideSeperator={true} />
        </Dropdown>
      </SettingsGroup>

      </ScrollView>

        
    </View>
  );
};