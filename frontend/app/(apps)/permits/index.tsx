import PermitOptionCard from "@/components/Permits/PermitOptionCard";
import { router } from "expo-router";
import { AlertCircle, Building, Locate, User2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native"

const PermitsHomePage = () => {
    return (
        <View className="flex justify-between gap-3">
            <Text className="text-center p-7 text-xl font-bold"> Welcome to Permits Home Page </Text>
            <PermitOptionCard optionName="My Permits" optionIcon={<User2 />} navigateTo="MyPermits"/>
            <PermitOptionCard optionName="Permits Near me" optionIcon={<Locate />} navigateTo="MyPermits" />
            <PermitOptionCard optionName="Alert Permits" optionIcon={<AlertCircle />} navigateTo="MyPermits" />
            <PermitOptionCard optionName="Building Permits" optionIcon={<Building />} navigateTo="MyPermits" />
        </View>
    )
}

export default PermitsHomePage;