import { Platform, StyleSheet, Text, TouchableHighlight, View } from "react-native";

type ConfirmBoxProps = {
  title: string
  message: string
  confirmFunc: Function
};

export default function ConfirmBox({
  title = "{title}", 
  message = "{message}", 
  confirmFunc
}: ConfirmBoxProps) {
  return (
    <View style={styles.content}>
      <View style={styles.textContent}>
        <Text style={{fontWeight: "bold", fontSize: 17}}>{title}</Text>
        <Text style={{fontSize: 13}}>{message}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableHighlight 
          style={{width: "100%", borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}
          onPress={() => confirmFunc()}
          underlayColor="#747480"
        >
          <View style={styles.button}>
            <Text style={{textAlign: "center", color: "#007BFE"}}>Confirm</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "60%",
    height: "15%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: Platform.OS === "ios" ? "black" : "#0000007f", // Make shadow lighter on Android
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.13,
    shadowRadius: 9.8,
    elevation: 8,
  },
  textContent: {
    justifyContent: "center",
    width: "100%",
    height: "60%",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#C7C7CC"
  },
  buttonGroup: {
    alignItems: "center",
    width: "100%",
    height: "40%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 0
  },
  button: {
    height: "100%",
    justifyContent: "center",
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  }
});