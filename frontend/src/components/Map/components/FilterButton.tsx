import React, { useState } from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Flame, BookOpen, Armchair, PersonStanding } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { DEFAULT_VISIBLE_ICONS } from '../config/mapConfig';
import { ICON_DEFINITIONS, IconName } from '../config/mapIcons';
import { colours } from '@Theme/colours';
import SlideToggle from '@Components/SlideToggle';

const FILTER_ICON_COMPONENTS: Record<IconName, React.ReactElement> = {
  bbq:     <Flame          size={18} color="#fff" />,
  library: <BookOpen       size={18} color="#fff" />,
  bench:   <Armchair       size={18} color="#fff" />,
  toilet:  <PersonStanding size={18} color="#fff" />,
};

function FilterIcon({ name }: { name: IconName }) {
  const { color } = ICON_DEFINITIONS[name];
  return (
    <View className="w-8 h-8 rounded-full items-center justify-center" style={{ backgroundColor: color }}>
      {FILTER_ICON_COMPONENTS[name]}
    </View>
  );
}

type FilterButtonProps = {
  onToggle: (iconType: IconName, visible: boolean) => void;
};

export default function FilterButton({ onToggle }: FilterButtonProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isLight = colorScheme === 'light';

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

  const iconNames = Object.keys(ICON_DEFINITIONS) as IconName[];

  return (
    <View className="absolute right-4 items-end" style={{ top: insets.top + 12 }}>
      <TouchableOpacity
        className="py-2 w-[76px] bg-background-200 dark:bg-dark-background-400 rounded-lg shadow-md items-center"
        style={{ elevation: 4 }}
        onPress={() => setOpen(o => !o)}
      >
        <Text className="text-base font-semibold text-dark-text-200 dark:text-dark-text">
          {open ? 'Close' : 'Filters'}
        </Text>
      </TouchableOpacity>

      {open && (
        <View
          className="mt-[6px] min-w-[200px] bg-background-100 dark:bg-dark-background-100 rounded-[10px] overflow-hidden"
          style={{ elevation: 4 }}
        >
          {iconNames.map((name, index) => (
            <TouchableHighlight
              key={name}
              onPress={() => toggle(name)}
              underlayColor={isLight ? colours.background[400] : colours.dark.background[50]}
            >
              <View
                className={`flex-row items-center justify-between px-[14px] py-[13px] bg-background-100 dark:bg-dark-background-100
                  ${index < iconNames.length - 1 ? 'border-b border-b-text-200 dark:border-b-dark-text-400' : ''}`}
              >
                <View className="flex-row items-center gap-[10px]">
                  <FilterIcon name={name} />
                  <Text className="text-[17px] text-text dark:text-dark-text">
                    {ICON_DEFINITIONS[name].label}
                  </Text>
                </View>
                <SlideToggle value={visibility[name]} onValueChange={() => toggle(name)} />
              </View>
            </TouchableHighlight>
          ))}
        </View>
      )}
    </View>
  );
}
