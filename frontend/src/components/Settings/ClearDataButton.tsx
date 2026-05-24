import AlertBox from "@Components/AlertBox";
import ConfirmBox from "@Components/ConfirmBox";
import { useState } from "react";
import { Modal, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

export default function ClearDataButton() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [confirmVisible, setConfrimVisible] = useState(false);
  
  return (
    <View>
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
        underlayColor="#747480"
        >
        <View className="bg-white rounded-[10] p-[15]">
          <Text style={{fontSize: 17, color: "#FF382B"}}>Clear All Data</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}