import { View, StyleSheet, Text } from "react-native";
import { useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileScreen({ navigation }) {
  //   useEffect(() => {
  //     const removeListener1 = navigation.addListener("focus", () => {
  //       console.log("进入到了 Profile 页面");
  //     });
  //     navigation.addListener("blur", () => {
  //       console.log("从 Profile 页面退出了");
  //     });
  //     return removeListener1
  //   }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      alert("进入到了 Profile 页面");
      // Do something when the screen is focused
      return () => {
        alert("从 Profile 页面退出了");
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text>这是 ProfileScreen 页面</Text>
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
