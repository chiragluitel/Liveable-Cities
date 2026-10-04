import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Footprints, Droplets, Accessibility, Heart, Flame, Download } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { colours } from '@Theme/colours';
import { useSettings, formatWalkTime } from '@/src/context/SettingsContext';


const FILTER_DEFS = [
    { key: 'hasWaterFountain', label: 'Water Fountain', Icon: Droplets },
    { key: 'hasDisabledToilets', label: 'Toilets', Icon: Accessibility },
    { key: 'hasOffLeash', label: 'Off Leash', Icon: Heart },
    { key: 'hasBbq', label: 'BBQ', Icon: Flame },
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
    // Show fewer tags when there are many so they stay on one line.
    const shownTags = activeTags.slice(0, activeTags.length > 2 ? 1 : 2);
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
                <Text className="text-base font-bold text-text dark:text-dark-text mb-1" numberOfLines={1}>
                    {walk.cuswalkname || 'Custom Walk'}
                </Text>
                <Text className="text-xs text-text-700 dark:text-dark-text-700 font-medium mb-2">
                    {walk.distance} km • {formatWalkTime(walk.distance, walkingSpeed)}
                </Text>

                {/* Fixed-height single row so every card is the same height, with or without tags. */}
                <View className="flex-row items-center gap-1.5 h-[22px] overflow-hidden">
                    {walk.fromCommunity && (
                        <View className="flex-row items-center bg-primary-50 dark:bg-dark-primary-300 rounded-md px-2 py-1 gap-1">
                            <Download size={10} color={isLight ? colours.text[600] : colours.dark.text[600]} />
                            <Text className="text-[10px] font-semibold text-text-600 dark:text-dark-text-600 uppercase">
                                From Community Hub
                            </Text>
                        </View>
                    )}
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
