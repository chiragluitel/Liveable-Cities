import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = { onPress: () => void };

export default function RecentreButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.label}>Recentre</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 120,
    left: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4
  },
  label: {
    fontWeight: '600',
    fontSize: 14 },
});
