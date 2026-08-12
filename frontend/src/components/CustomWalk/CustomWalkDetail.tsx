import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { Droplets, Accessibility, Leaf, Star, Trash2, Heart, Lightbulb } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { colours } from '@Theme/colours';
import AlertBox from '@Components/AlertBox';
import { useSettings, SPEED_KMH, formatWalkTime } from '@/src/context/SettingsContext';

const FILTER_DEFS = [
    { key: 'hasWaterFountain',  label: 'Fountain',   Icon: Droplets },
    { key: 'hasDisabledToilets', label: 'Accessible', Icon: Accessibility },
    { key: 'hasPark',           label: 'Park',        Icon: Leaf },
    { key: 'hasPlayground',     label: 'Playground',  Icon: Star },
    { key: 'hasRubbishBin',     label: 'Bins',        Icon: Trash2 },
    { key: 'hasOffLeash',       label: 'Off Leash',   Icon: Heart },
    { key: 'hasWellLitStreets', label: 'Lit Streets', Icon: Lightbulb },
];

interface CustomWalkDetailProps {
    walk: any;
    onEdit: (walkId: string) => void;
    onDelete: (walkId: string) => void;
}


export default function CustomWalkDetail({ walk, onEdit, onDelete }: CustomWalkDetailProps) {
    const { colorScheme } = useColorScheme();
    const isLight = colorScheme === 'light';
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const { walkingSpeed } = useSettings();
    const timeText = formatWalkTime(walk.distance, walkingSpeed);

    const activeTags = FILTER_DEFS.filter(f => walk[f.key]);

    const { reducedMotion, weeklyWalks, setWeeklyWalks } = useSettings();

    function addToWeekly() {
        setWeeklyWalks(String(Number(weeklyWalks) + 1));
    }

    return (
        <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
            <View className="mb-[6px]">
                <Text className="text-[29px] leading-[35px] font-black text-text dark:text-dark-text mb-1">
                    {walk.cuswalkname || 'Custom Walk'}
                </Text>
                <Text className="text-[17px] mb-3">
                    <Text className="text-accent dark:text-dark-accent-700">
                        {walk.distance} km, {timeText}
                    </Text>
                </Text>
                {activeTags.length > 0 && (
                    <View className="flex-row flex-wrap gap-1.5 mb-[22px]">
                        {activeTags.map(({ key, label, Icon }) => (
                            <View key={key} className="flex-row items-center bg-primary-100 dark:bg-dark-primary-200 rounded-md px-2 py-1 gap-1">
                                <Icon size={12} color={isLight ? colours.text[600] : colours.dark.text[600]} strokeWidth={2} />
                                <Text className="text-[11px] font-semibold text-text-600 dark:text-dark-text-600 uppercase">
                                    {label}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            <Modal
                animationType={reducedMotion ? "none" : "fade"}
                backdropColor="#00000000"
                visible={deleteModalVisible}
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <TouchableOpacity
                    className="flex-1 items-center justify-center"
                    activeOpacity={1}
                    onPressOut={() => setDeleteModalVisible(false)}
                >
                    <AlertBox
                        title="Delete Walk?"
                        message="This action cannot be undone."
                        cancelFunc={() => setDeleteModalVisible(false)}
                        confirmFunc={() => {
                            setDeleteModalVisible(false);
                            onDelete(walk.id);
                        }}
                    />
                </TouchableOpacity>
            </Modal>

            <View className="flex-row mb-5">
                <TouchableOpacity
                    className="flex-1 bg-accent-200 dark:bg-dark-accent-200 rounded-[18px] py-[18px] justify-center items-center mr-[10px]"
                    onPress={() => addToWeekly()}
                >
                    <Ionicons name="add-circle-outline" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
                    <Text className="text-text dark:text-dark-text font-bold text-[15px] mt-2  text-wrap text-center px-1">Add to Weekly Walks</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 bg-primary-100 dark:bg-dark-accent-200 rounded-[18px] py-[18px] justify-center items-center mr-[10px]"
                    onPress={() => onEdit(walk.id)}
                >
                    <Ionicons name="pencil-outline" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
                    <Text className="text-text dark:text-dark-text font-bold text-[15px] mt-2 text-wrap text-center px-1">Edit Walk</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 rounded-[18px] py-[18px] justify-center items-center mr-[10px]"
                    style={{ backgroundColor: isLight ? colours.warning[100] : colours.dark.warning[200] }}
                    onPress={() => setDeleteModalVisible(true)}
                >
                    <Ionicons name="trash-outline" size={22} color={isLight ? colours.warning[500] : colours.dark.warning[600]} />
                    <Text style={{ color: isLight ? colours.warning[500] : colours.dark.warning[600] }} className="text-warning-500 font-bold text-[15px] mt-2 text-wrap text-center px-1">Delete Walk</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetScrollView>
    );
}
