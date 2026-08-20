import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Footprints, Droplets, Accessibility, Leaf, Star, Trash2, Heart, Lightbulb, Download } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { colours } from '@Theme/colours';
import { useSettings, formatWalkTime } from '@/src/context/SettingsContext';


const FILTER_DEFS = [
    { key: 'hasWaterFountain', label: 'Fountain', Icon: Droplets },
    { key: 'hasDisabledToilets', label: 'Accessible', Icon: Accessibility },
    { key: 'hasPark', label: 'Park', Icon: Leaf },
    { key: 'hasPlayground', label: 'Playground', Icon: Star },
    { key: 'hasRubbishBin', label: 'Bins', Icon: Trash2 },
    { key: 'hasOffLeash', label: 'Off Leash', Icon: Heart },
    { key: 'hasWellLitStreets', label: 'Lit Streets', Icon: Lightbulb },
];


interface CustomMyWalkCardProps {
    walk: any;
    onPress: (walk: any) => void;
    width: number;
}

export const CustomMyWalkCard = ({ walk, onPress, width }: CustomMyWalkCardProps) => {
    const { colorScheme } = useColorScheme();
    const isLight = colorScheme === 'light';
    const { walkingSpeed } = useSettings();

    const activeTags = FILTER_DEFS.filter(f => walk[f.key]);
    const shownTags = activeTags.slice(0, 2);
    const extraCount = activeTags.length - shownTags.length;

    return (
        <Pressable
            onPress={() => onPress(walk)}
            className="flex-row bg-background-100 dark:bg-dark-background-200 rounded-2xl p-4 shadow-sm border border-text-100 dark:border-dark-text-50 active:opacity-80"
            style={{ width }}
            accessibilityRole="button"
            accessibilityLabel={`View details for ${walk.cuswalkname}`}
        >
            <View className="w-14 h-14 rounded-xl items-center justify-center border-2 border-text dark:border-dark-text-800">
                <Footprints size={24} color={isLight ? colours.text.DEFAULT : colours.dark.text[800]} strokeWidth={2.5} />
            </View>

            <View className="flex-1 ml-3">
                <View className="flex-row items-center gap-1 mb-1">
                    <Text className="text-base font-bold text-text dark:text-dark-text" numberOfLines={1}>
                        {walk.cuswalkname || 'Custom Walk'}
                    </Text>
                    {walk.fromCommunity && (
                        <Download size={12} color={isLight ? colours.text[600] : colours.dark.text[600]} />
                    )}
                </View>
                <Text className="text-xs text-text-600 dark:text-dark-text-700 font-medium mb-2">
                    {walk.distance} km • {formatWalkTime(walk.distance, walkingSpeed)}
                </Text>

                <View className="flex-row flex-wrap gap-1.5">
                    {shownTags.map(({ key, label, Icon }) => (
                        <View key={key} className="flex-row items-center bg-primary-50 dark:bg-dark-primary-300 rounded-md px-2 py-1 gap-1">
                            <Icon size={10} color={isLight ? colours.text[600] : colours.dark.text[600]} strokeWidth={2} />
                            <Text className="text-[10px] font-semibold text-text-600 dark:text-dark-text-600 uppercase">
                                {label}
                            </Text>
                        </View>
                    ))}
                    {extraCount > 0 && (
                        <View className="bg-primary-50 dark:bg-dark-primary-300 rounded-md px-2 py-1">
                            <Text className="text-[10px] font-semibold text-text-600 dark:text-dark-text-600 uppercase">
                                +{extraCount} more
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </Pressable>
    );
};
