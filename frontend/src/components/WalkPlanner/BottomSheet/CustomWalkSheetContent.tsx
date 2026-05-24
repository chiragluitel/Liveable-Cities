import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { View, Text, StyleSheet } from 'react-native';
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
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>My Walks</Text>

      {walks.length === 0 ? (
        <Text style={styles.emptyText}>No custom walks created</Text>
      ) : (
        walks.map((walk: any) => (
          <CustomWalkCard key={walk.id} walk={walk} onDelete={deleteWalk} onPress={() => onWalkPress(walk)} />
        ))
      )}

      <View style={styles.buttonWrap}>
        <CustomButton
          label="Plan a Custom Walk"
          onPress={() => router.push('/custom-walk' as any)}
        />
      </View>
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    paddingVertical: 24,
    marginBottom: 8,
  },
  buttonWrap: {
    marginTop: 8,
  },
});
