import {View, Text, Pressable} from "react-native";

interface FeatureCardProps {
    title: string;
    description: string;
    buttonText: string;
    onPress?: () => void;
}

const FeatureCard = ({
    title,
    description,
    buttonText,
    onPress,
    }: FeatureCardProps) => {
        return (
            <View className="mt-6 rounded-2xl p-5 bg-green-900">
                <Text className="text-white text-lg font-bold">
                    {title}
                </Text>

                <Text className="text-gray-200 text-sm mt-1">
                    {description}
                </Text>

                <Pressable
                    onPress={onPress}
                    className="mt-4 self-start bg-white px-4 py-2 rounded-full"
                >
                    <Text className="text-black font-semibold">
                        {buttonText} -&gt;
                    </Text>
                </Pressable>

            </View>

        );
    };

export default FeatureCard;