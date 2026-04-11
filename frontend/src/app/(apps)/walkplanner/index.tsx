import { Text, View } from "react-native"
import {User} from 'lucide-react-native'
import useSearchLogic from "@/src/hooks/useSearchLogic"
import CustomSearchBar from "@/src/components/SearchBar";

const WalkPlannerHomePage = () => {
    const searchState = useSearchLogic();
    return (
        <View className="flex-1 justify center"> 
            <View className="items-center mb-8">
                 <Text> Welcome to Walk Planner! </Text> 
                 <User/> 
            </View>
            <CustomSearchBar searchState={searchState} placeholder="Search..." />

        </View>

    )
}

export default WalkPlannerHomePage;