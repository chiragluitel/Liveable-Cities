import { TouchableOpacity, Text } from 'react-native';

type ZoomControlsProps = { onZoomIn: () => void; onZoomOut: () => void };

export default function ZoomControls({ onZoomIn, onZoomOut }: ZoomControlsProps) {
  return (
    <>
      <TouchableOpacity
        className="absolute right-4 bottom-[184px] w-11 h-11 bg-background-200 dark:bg-dark-background-400 rounded-lg items-center justify-center shadow-md"
        style={{ elevation: 4 }}
        onPress={onZoomIn}
      >
        <Text className="text-[22px] font-bold leading-[26px] text-dark-text-200 dark:text-dark-text">+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute right-4 bottom-[136px] w-11 h-11 bg-background-200 dark:bg-dark-background-400 rounded-lg items-center justify-center shadow-md"
        style={{ elevation: 4 }}
        onPress={onZoomOut}
      >
        <Text className="text-[22px] font-bold leading-[26px] text-dark-text-200 dark:text-dark-text">−</Text>
      </TouchableOpacity>
    </>
  );
}