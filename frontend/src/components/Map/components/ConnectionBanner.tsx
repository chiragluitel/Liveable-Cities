import { Text, View } from 'react-native';

// Small bubble shown at the top of the map when the backend is unreachable.
export default function ConnectionBanner({ ok }: { ok: boolean }) {
  if (ok) return null;
  return (
    <View className="absolute self-center top-14 bg-warning-100 dark:bg-dark-warning-200 rounded-full px-4 py-2 shadow-md z-50">
      <Text className="text-xs font-semibold text-warning-700 dark:text-dark-warning-700">
        Backend not reached. Please restart app.
      </Text>
    </View>
  );
}
