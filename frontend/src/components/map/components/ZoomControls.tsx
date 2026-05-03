import { TouchableOpacity, Text } from 'react-native';

type Props = { onZoomIn: () => void; onZoomOut: () => void };

export default function ZoomControls({ onZoomIn, onZoomOut }: Props) {
  return (
    <>
      <TouchableOpacity
        className="absolute right-4 bottom-[184px] w-11 h-11 bg-white rounded-lg items-center justify-center shadow-md"
        style={{ elevation: 4 }}
        onPress={onZoomIn}
      >
        <Text className="text-[22px] font-bold leading-[26px]">+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute right-4 bottom-[136px] w-11 h-11 bg-white rounded-lg items-center justify-center shadow-md"
        style={{ elevation: 4 }}
        onPress={onZoomOut}
      >
        <Text className="text-[22px] font-bold leading-[26px]">−</Text>
      </TouchableOpacity>
    </>
  );
}