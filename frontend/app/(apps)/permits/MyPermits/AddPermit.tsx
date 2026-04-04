import CustomButtonComponent from "@/components/Shared/CustomButtonComponent"
import { TextInput, View } from "react-native"

const AddPermit = () => {
    return (
        <View>
            <TextInput placeholder="Enter your permit number here"/>
            <CustomButtonComponent label="Check & Add Permit" onClick={()=>console.log('Check and Add Permit Clicked')}/>
        </View>
    )
}

export default AddPermit;