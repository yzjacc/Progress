import { View, StyleSheet, Text, Button } from "react-native";

export default function SettingScreen({ navigation }) {
  function pressHandle() {
    navigation.navigate("ProfileScreen");
  }

  return (
    <View style={styles.container}>
      <Text>这是 Setting 页面</Text>
      <Button title="跳转到 Profile 页面" onPress={pressHandle} />
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
