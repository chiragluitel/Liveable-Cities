import { Linking, StyleSheet, Text, TouchableHighlight, View } from "react-native";

type WebLinkProps = {
  text: string
  link: string
}

export default function WebLinkButton({text = "{text}", link = "https://github.com/chiragluitel/Liveable-Cities"}: WebLinkProps) {
  const openLink = () => {
    Linking.canOpenURL(link).then(() => {
      Linking.openURL(link);
    });
  }

  return (
    <TouchableHighlight
      onPress={openLink}
      style={{borderRadius: 10}}
      underlayColor="#747480"
    >
      <View style={styles.button}>
        <Text style={{fontSize: 17, color: "#007BFE"}}>{text}</Text>
      </View>
    </TouchableHighlight>
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
});