import { StyleSheet, Text, View } from "react-native";

export default function LanguageScreen() {
  return (
    <View style={styles.container}>
      <Text>这是选择语言页</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});