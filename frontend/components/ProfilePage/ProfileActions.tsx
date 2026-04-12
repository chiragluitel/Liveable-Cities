import {View, Text, Pressable} from "react-native";

interface ProfileActionsProp {
    onBack: () => void;
}

const ProfileActions = ({onBack}: ProfileActionsProp) => {
    return (
        <View className="mt-10">
            <Pressable
                onPress={onBack}
                className="bg-black mt-10 px-3 py-6 rounded-xl"
            >

                <Text className="text-white text-center font-semibold">
                    Go Back to Home
                </Text>

            </Pressable>
        </View>
    );
};

export default ProfileActions;