import { Text, View } from 'react-native';

// Small bubble shown at the top of the map when the backend is unreachable.
export default function ConnectionBanner({ ok }: { ok: boolean }) {
  if (ok) return null;
  return (
    <View className="absolute self-center top-14 bg-warning-200 dark:bg-dark-warning-200 rounded-full px-4 py-2 shadow-md z-50">
      <Text className="text-sm font-semibold text-warning-700 dark:text-dark-warning-800 text-center">
        Backend not reached. 
        {"\n"}
        Please restart app or try again later.
      </Text>
    </View>
  );
}
