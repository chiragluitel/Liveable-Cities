import React, { useState } from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Flame, BookOpen, Armchair, PersonStanding, Droplets } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { ICON_DEFINITIONS, IconName } from '../config/mapIcons';
import { colours } from '@Theme/colours';
import SlideToggle from '@Components/SlideToggle';
import { useMapFilter } from '@/src/context/MapFilterContext';

type LucideIconProps = { size?: number; color?: string };

const FILTER_ICON_COMPONENTS: Record<IconName, React.ReactElement<LucideIconProps>> = {
  bbq:     <Flame          size={15} color="#fff" />,
  library: <BookOpen       size={15} color="#fff" />,
  bench:   <Armchair       size={15} color="#fff" />,
  toilet:  <PersonStanding size={15} color="#fff" />,
  fountain: <Droplets      size={15} color="#fff" />,
};

function FilterIcon({ name }: { name: IconName }) {
  const { color } = ICON_DEFINITIONS[name];
  return (
    <View className="w-7 h-7 rounded-full items-center justify-center" style={{ backgroundColor: color }}>
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
  const { visibleIcons: visibility, setIconVisible } = useMapFilter();

  function toggle(name: IconName) {
    const next = !visibility[name];
    setIconVisible(name, next);
    onToggle(name, next);
  }

  const iconNames = (Object.keys(ICON_DEFINITIONS) as IconName[]).sort((a, b) =>
    ICON_DEFINITIONS[a].label.localeCompare(ICON_DEFINITIONS[b].label)
  );

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
          className="mt-[6px] min-w-[200px] bg-background-100 dark:bg-dark-background-200 rounded-[10px] overflow-hidden"
          style={{ elevation: 4 }}
        >
          {iconNames.map((name, index) => (
            <TouchableHighlight
              key={name}
              onPress={() => toggle(name)}
              underlayColor={isLight ? colours.background[400] : colours.dark.background[50]}
            >
              <View
                className={`flex-row items-center justify-between px-[12px] py-[10px] bg-background-100 dark:bg-dark-background-200
                  ${index < iconNames.length - 1 ? 'border-b border-b-text-200 dark:border-b-dark-text-400' : ''}`}
              >
                <View className="flex-1 flex-row items-center gap-[8px] pr-[8px]">
                  <FilterIcon name={name} />
                  <Text
                    className="flex-1 text-[13px] text-text dark:text-dark-text"
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.85}
                  >
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
