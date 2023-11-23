import { StyleSheet, View, Text } from "react-native";
import Input from "./Input";
import List from "./List";

export default function ToDoList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>待办事项</Text>
      <Input />
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});
