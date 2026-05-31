import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useCustomWalks } from '@/src/context/CustomWalkContext';
import CustomWalkCard from '@/src/components/CustomWalk/CustomWalkCard';
import CustomButton from '@/src/components/Shared/CustomButton';

interface CustomWalkSheetContentProps {
  onWalkPress: (walk: any) => void;
}

export default function CustomWalkSheetContent({ onWalkPress }: CustomWalkSheetContentProps) {
  const { walks, deleteWalk } = useCustomWalks();
  const router = useRouter();

  return (
    <BottomSheetScrollView
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-xl font-bold text-[#111] mb-3">My Walks</Text>

      {walks.length === 0 ? (
        <Text className="text-[15px] text-[#888] text-center py-6 mb-2">No custom walks created</Text>
      ) : (
        walks.map((walk: any) => (
          <CustomWalkCard key={walk.id} walk={walk} onDelete={deleteWalk} onPress={() => onWalkPress(walk)} />
        ))
      )}

      <View className="mt-2">
        <CustomButton
          label="Plan a Custom Walk"
          onPress={() => router.push('/custom-walk' as any)}
        />
      </View>
    </BottomSheetScrollView>
  );
}
