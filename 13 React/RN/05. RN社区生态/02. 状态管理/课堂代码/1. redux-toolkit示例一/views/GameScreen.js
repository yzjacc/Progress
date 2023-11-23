import { View, StyleSheet, Text } from "react-native";

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <Text>这是游戏页面</Text>
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
