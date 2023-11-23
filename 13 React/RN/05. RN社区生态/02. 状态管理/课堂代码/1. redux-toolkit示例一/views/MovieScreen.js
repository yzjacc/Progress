import { View, StyleSheet, Text } from "react-native";

export default function MoveScreen() {
  return (
    <View style={styles.container}>
      <Text>这是电影页面</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
