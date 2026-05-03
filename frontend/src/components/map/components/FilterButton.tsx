import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_VISIBLE_ICONS } from '../config/mapConfig';
import { ICON_DEFINITIONS, IconName } from '../config/mapIcons';

type FilterButtonProps = {
  onToggle: (iconType: IconName, visible: boolean) => void;
};

export default function FilterButton({ onToggle }: FilterButtonProps) {
  const insets = useSafeAreaInsets();

  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState<Record<IconName, boolean>>(() => {
    const initial = {} as Record<IconName, boolean>;
    (Object.keys(ICON_DEFINITIONS) as IconName[]).forEach(name => {
      initial[name] = DEFAULT_VISIBLE_ICONS.includes(name);
    });
    return initial;
  });

  function toggle(name: IconName) {
    const next = !visibility[name];
    setVisibility(prev => ({ ...prev, [name]: next }));
    onToggle(name, next);
  }

  return (
    <View className="absolute right-4 items-end" style={{ top: insets.top + 12 }}>
      <TouchableOpacity
        className="py-2 px-[14px] bg-white rounded-lg shadow-md"
        style={{ elevation: 4 }}
        onPress={() => setOpen(o => !o)}
      >
        <Text className="text-base font-semibold">
          {open ? 'Close' : 'Filters'}
        </Text>
      </TouchableOpacity>

      {open && (
        <View
          className="mt-[6px] bg-white rounded-lg shadow-md overflow-hidden min-w-40"
          style={{ elevation: 4 }}
        >
          {(Object.entries(ICON_DEFINITIONS) as [IconName, { emoji: string; label: string }][]).map(([name, def]) => (
            <TouchableOpacity
              key={name}
              className="flex-row items-center py-[11px] px-[14px] gap-[10px] border-b border-[#e5e5e5]"
              onPress={() => toggle(name)}
            >
              <Text className="text-[22px]">{def.emoji}</Text>
              <Text className="flex-1 text-sm font-medium">{def.label}</Text>
              {visibility[name] && (
                <Text className="text-sm font-bold text-blue-600">✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
