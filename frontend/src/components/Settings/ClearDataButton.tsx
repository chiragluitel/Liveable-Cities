import AlertBox from "@Components/AlertBox";
import ConfirmBox from "@Components/ConfirmBox";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Linking, Modal, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { colours } from "@Theme/colours";
import { useSettings } from "@/src/context/SettingsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";

export default function ClearDataButton() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [confirmVisible, setConfrimVisible] = useState(false);

  const { colorScheme } = useColorScheme();
  
  const isLight = colorScheme === "light";
  
  const { reducedMotion } = useSettings();

  const deleteData = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.warn("Unable to clear all data automatically:", e)
      Linking.openSettings();
    } finally {
      setAlertVisible(false); 
      setConfrimVisible(true);
    }
  }
  
  return (
    <View>
      {/*Initial Alert*/}
      <Modal
        animationType={reducedMotion ? "none" : "fade"}
        backdropColor="#00000000"
        visible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
        <TouchableOpacity 
          className="flex-1 items-center justify-center"
          activeOpacity={1}
          onPressOut={() => setAlertVisible(false)}
        >
          <AlertBox 
            title="Delete All Data?" 
            message="This action cannot be undone." 
            cancelFunc={() => setAlertVisible(false)} 
            confirmFunc={deleteData}
          />
        </TouchableOpacity>
      </Modal>

      {/*Confirm Message*/}
      <Modal
        animationType={reducedMotion ? "none" : "fade"}
        backdropColor="#00000000"
        visible={confirmVisible}
        onRequestClose={() => setConfrimVisible(false)}
      >
        <TouchableOpacity 
          className="flex-1 items-center justify-center"
          activeOpacity={1}
          onPressOut={() => setConfrimVisible(false)}
        >
          <ConfirmBox 
            title="All Data Deleted" 
            message="All data has been deleted." 
            confirmFunc={() => {setConfrimVisible(false); RNRestart.restart();}}
          />
        </TouchableOpacity>
      </Modal>

      <TouchableHighlight
        onPress={() => setAlertVisible(true)}
        className="rounded-[10]"
        underlayColor={isLight ? colours.background[400] : colours.dark.background[50]}
        >
        <View className="bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]">
          <Text style={{fontSize: 17}} className="text-warning-600 dark:text-dark-warning-600">Clear All Data</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}