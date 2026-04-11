import { useState } from "react";
import { View, TouchableHighlight, Text, StyleSheet, TouchableOpacity, Modal, Platform } from "react-native";
import AlertBox from "../../AlertBox";
import ConfirmBox from "../../ConfirmBox";


export default function ClearDataButton() {
  const [alertVisible, setAlertVisible] = useState(false)
  const [confirmVisible, setConfrimVisible] = useState(false)
  
  return (
    <View>
      <Modal
        animationType="fade"
        backdropColor="#00000000"
        visible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setAlertVisible(false)}
        >
          <AlertBox 
            title="Delete All Data?" 
            message="This action cannot be undone." 
            cancelFunc={() => setAlertVisible(false)} 
            confirmFunc={() => {setAlertVisible(false); setConfrimVisible(true)}}
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
          style={styles.modalContainer}
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
        style={{borderRadius: 10}}
        underlayColor="#747480"
        >
        <View style={styles.button}>
          <Text style={{fontSize: 17, color: "#FF382B"}}>Clear All Data</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    justifyContent: "center",
    width: "50%",
    height: "20%",
    backgroundColor: "white",
    margin: 5,
    borderRadius: 20,
    shadowColor: Platform.OS === "ios" ? "black" : "#0000007f", // Make shadow lighter on Android
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.13,
    shadowRadius: 9.8,
    elevation: 8,
  }
});