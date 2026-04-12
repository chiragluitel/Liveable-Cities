import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = { onZoomIn: () => void; onZoomOut: () => void };

export default function ZoomControls({ onZoomIn, onZoomOut }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onZoomIn}><Text style={styles.label}>+</Text></TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onZoomOut}><Text style={styles.label}>−</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    gap: 8
  },
  btn: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 26
  }
});
