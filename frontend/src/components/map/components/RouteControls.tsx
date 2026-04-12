import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = { hasRoute: boolean; onClear: () => void };

export default function RouteControls({ hasRoute, onClear }: Props) {
  return (
    <TouchableOpacity style={[styles.btn, !hasRoute && styles.disabled]} onPress={onClear} disabled={!hasRoute}>
      <Text style={styles.label}>Clear Route</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 32,
    right: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4
  },
  disabled: {
    opacity: 0.35
  },
  label: {
    fontWeight: '600',
    fontSize: 14
  }
  
});
