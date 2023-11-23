import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {

  function pressHandle() {
    navigation.navigate("DetailScreen");
  }

  return (
    <View style={styles.container}>
      <Text>这是首页</Text>
      <Button title="跳转到 Detail 页面" onPress={pressHandle} />
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
