import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

const PermitDetail = () => {
    const {permitID} = useLocalSearchParams();
    return (
        <View>
            <Text> Showing deets for Permit ID: {permitID} </Text>
        </View>
    )
}

export default PermitDetail;