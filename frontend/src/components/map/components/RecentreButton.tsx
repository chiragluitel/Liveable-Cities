import { TouchableOpacity, Text } from 'react-native';

type RecentreButtonProps = { onRecentrePress: () => void };

export default function RecentreButton({ onRecentrePress }: RecentreButtonProps) {
  return (
    <TouchableOpacity
      className="absolute bottom-[120px] left-4 py-[10px] px-4 bg-white rounded-lg shadow-md"
      onPress={onRecentrePress}
    >
      <Text className="font-semibold text-sm">Recentre</Text>
    </TouchableOpacity>
  );
}