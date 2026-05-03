import { TouchableOpacity, Text } from 'react-native';

type Props = { onPress: () => void };

export default function RecentreButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      className="absolute bottom-[120px] left-4 py-[10px] px-4 bg-white rounded-lg shadow-md"
      onPress={onPress}
    >
      <Text className="font-semibold text-sm">Recentre</Text>
    </TouchableOpacity>
  );
}