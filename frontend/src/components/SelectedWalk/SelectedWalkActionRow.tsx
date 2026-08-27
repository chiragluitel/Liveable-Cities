import React, { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { colours } from "@Theme/colours";
import AlertBox from "@Components/AlertBox";
import { useSettings } from "@/src/context/SettingsContext";

type SelectedWalkActionRowProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  onImport?: () => void;
  alreadyDownloaded?: boolean;
};

export default function SelectedWalkActionRow({ onEdit, onDelete, onImport, alreadyDownloaded }: SelectedWalkActionRowProps) {
  const { colorScheme } = useColorScheme();
  const isLight = colorScheme === "light";
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const { reducedMotion, addToWeeklyWalks } = useSettings();

  if (onEdit && onDelete) {
    return (
      <>
        {/* 2 buttons split the row 50/50 */}
        <View className="flex-row flex-wrap mb-5" style={{ columnGap: 10, rowGap: 10 }}>
          <Pressable
            className="bg-primary-100 dark:bg-dark-accent-100 rounded-[18px] py-[18px] justify-center items-center"
            style={{ width: '48%' }}
            onPress={onEdit}
          >
            <Ionicons name="pencil-outline" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
            <Text className="text-text dark:text-dark-text font-bold text-[15px] mt-2">Edit Walk</Text>
          </Pressable>

          <Pressable
            className="rounded-[18px] py-[18px] justify-center items-center"
            style={{ width: '48%', backgroundColor: colours.warning[100] }}
            onPress={() => setDeleteModalVisible(true)}
          >
            <Ionicons name="trash-outline" size={22} color={colours.warning[500]} />
            <Text style={{ color: colours.warning[500] }} className="font-bold text-[15px] mt-2">Delete Walk</Text>
          </Pressable>
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
                onDelete();
              }}
            />
          </TouchableOpacity>
        </Modal>
      </>
    );
  }

  if (onImport) {
    return (
      <View className="flex-row flex-wrap mb-5" style={{ columnGap: 10, rowGap: 10 }}>
        <Pressable
          className="bg-primary-100 dark:bg-dark-accent-100 rounded-[18px] py-[18px] justify-center items-center"
          style={[{ width: '48%' }, alreadyDownloaded ? { opacity: 0.5 } : undefined]}
          onPress={onImport}
          disabled={alreadyDownloaded}
        >
          <Ionicons name="download-outline" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
          <Text className="text-text dark:text-dark-text font-bold text-[15px] mt-2">
            {alreadyDownloaded ? 'Downloaded' : 'Add to My Walks'}
          </Text>
        </Pressable>
        <TouchableOpacity
          className="bg-accent-200 dark:bg-dark-accent-200 rounded-[18px] py-[18px] justify-center items-center"
          style={{ width: '48%' }}
          onPress={() => addToWeeklyWalks()}
        >
          <Ionicons name="add-circle-outline" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
          <Text className="text-text dark:text-dark-text font-bold text-[15px] mt-2  text-wrap text-center px-1">Add to Weekly Walks</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap mb-5" style={{ columnGap: 10, rowGap: 10 }}>
      <Pressable
        className="bg-primary-100 dark:bg-dark-accent-100 rounded-[18px] py-[18px] justify-center items-center"
        style={{ width: '48%' }}
        onPress={() => console.log('Download pressed')}
      >
        <Ionicons name="download-outline" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
        <Text className="text-text dark:text-dark-text font-bold text-[15px] mt-2">Download</Text>
      </Pressable>

      <TouchableOpacity
          className="bg-accent-200 dark:bg-dark-accent-200 rounded-[18px] py-[18px] justify-center items-center"
          style={{ width: '48%' }}
          onPress={() => addToWeeklyWalks()}
        >
          <Ionicons name="add-circle-outline" size={22} color={isLight ? colours.text.DEFAULT : colours.dark.text.DEFAULT} />
          <Text className="text-text dark:text-dark-text font-bold text-[15px] mt-2  text-wrap text-center px-1">Add to Weekly Walks</Text>
        </TouchableOpacity>
    </View>
  );
}
