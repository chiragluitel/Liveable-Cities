import { ScrollViewBase, Text, View } from "react-native"
import {User} from 'lucide-react-native'
import useSearchLogic from "@/src/hooks/useSearchLogic"
import CustomSearchBar from "@/src/components/shared/SearchBar";
import MyWalksSection from "@/src/components/walkplanner/MyWalks/MyWalksSection";
import { FITNESS_GOALS, MY_WALKS, NEARBY_AMENITIES } from "@/src/database/MockDB";
import { NearbySection } from "@/src/components/walkplanner/Nearby/NearbySection";
import CommunityWalkSection from "@/src/components/walkplanner/CommunityWalks/CommunityWalkSection";
import { FitnessSection } from "@/src/components/walkplanner/FitnessGoals/FitnessSection";
import CustomButton from "@/src/components/shared/CustomButton";
import { FourButton } from "@/src/components/walkplanner/FourButton";

const WalkPlannerHomePage = () => {
    const searchState = useSearchLogic();
    return (
        <View className="flex-1 justify center"> 
            <View className="items-center mb-8">
                 <Text> Welcome to Walk Planner! </Text> 
                 <User/> 
            </View>
            <CustomSearchBar searchState={searchState} placeholder="Search..." />
            <FourButton button={[{label:'Button1', onPress: ()=>console.log('Button Pressed')},{label:'Button0', onPress: ()=>console.log('Button Pressed')},{label:'Button2', onPress: ()=>console.log('Button Pressed')},{label:'Button3', onPress: ()=>console.log('Button Pressed')}]}/>

            <FitnessSection goals={FITNESS_GOALS} onHeaderPress={()=>console.log('FitnessGoalsHeadersPressed')} onGoalPress={()=>console.log('Goal Pressed')} />
            <MyWalksSection walks={MY_WALKS} onHeaderPress={()=>console.log('HeaderPressed')} onWalkPress={()=>console.log('Walk Pressed')} />
            <NearbySection amenities={NEARBY_AMENITIES} />
            <CommunityWalkSection walks={MY_WALKS} onHeaderPress={()=>console.log('HeaderPressed')} onWalkPress={()=>console.log('Walk Pressed')} />
        </View>

    )
}

export default WalkPlannerHomePage;