import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Flame, BookOpen, Armchair, PersonStanding } from 'lucide-react-native';
import { DEFAULT_VISIBLE_ICONS } from '../config/mapConfig';
import { ICON_DEFINITIONS, IconName } from '../config/mapIcons';

const FILTER_ICON_COMPONENTS: Record<IconName, React.ReactElement> = {
  bbq:     <Flame size={18} color="#fff" />,
  library: <BookOpen size={18} color="#fff" />,
  bench:   <Armchair size={18} color="#fff" />,
  toilet:  <PersonStanding size={18} color="#fff" />,
};

function FilterIcon({ name }: { name: IconName }) {
  const { color } = ICON_DEFINITIONS[name];
  return (
    <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}>
      {FILTER_ICON_COMPONENTS[name]}
    </View>
  );
}

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
        className="py-2 bg-white rounded-lg shadow-md items-center"
        style={{ elevation: 4, width: 76 }}
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
          {(Object.keys(ICON_DEFINITIONS) as IconName[]).map(name => (
            <TouchableOpacity
              key={name}
              className="flex-row items-center py-[11px] px-[14px] gap-[10px] border-b border-[#e5e5e5]"
              onPress={() => toggle(name)}
            >
              <FilterIcon name={name} />
              <Text className="flex-1 text-sm font-medium">{ICON_DEFINITIONS[name].label}</Text>
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
