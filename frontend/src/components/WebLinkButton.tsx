import { Linking, Text, TouchableHighlight, View } from "react-native";

type WebLinkProps = {
  text: string
  link: string
};

export default function WebLinkButton({
  text = "{text}", 
  link = "https://github.com/chiragluitel/Liveable-Cities"
}: WebLinkProps) {
  function openLink() {
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
      <View className="bg-white rounded-[10] p-[15]">
        <Text style={{fontSize: 17, color: "#007BFE"}}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
}