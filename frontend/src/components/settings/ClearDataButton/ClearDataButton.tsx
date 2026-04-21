import AlertBox from "@Components/AlertBox";
import ConfirmBox from "@Components/ConfirmBox";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Modal, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { colors } from "@Theme/colours";

export default function ClearDataButton() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [confirmVisible, setConfrimVisible] = useState(false);

  const { colorScheme } = useColorScheme();
  
  const isLight = colorScheme === "light";
  
  return (
    <View>
      {/*Initial Alert*/}
      <Modal
        animationType="fade"
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
            confirmFunc={() => {
              setAlertVisible(false); 
              setConfrimVisible(true);
            }}
          />
        </TouchableOpacity>
      </Modal>

      {/*Confirm Message*/}
      <Modal
        animationType="fade"
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
            confirmFunc={() => setConfrimVisible(false)}
          />
        </TouchableOpacity>
      </Modal>

      <TouchableHighlight
        onPress={() => setAlertVisible(true)}
        className="rounded-[10]"
        underlayColor={isLight ? colors.background[400] : colors.dark.background[50]}
        >
        <View className="bg-background-100 dark:bg-dark-background-100 rounded-[10] p-[15]">
          <Text style={{fontSize: 17}} className="text-warning-400 dark:text-warning-600">Clear All Data</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}