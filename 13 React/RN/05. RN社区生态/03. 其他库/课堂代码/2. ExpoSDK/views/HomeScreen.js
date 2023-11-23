// import { View, Text, Button, StyleSheet } from "react-native";

// export default function HomeScreen({ navigation }) {

//   function pressHandle() {
//     // 跳转的同时传递参数
//     navigation.navigate("DetailScreen", {
//         id : 1,
//         age : 18
//     });
//   }

//   return (
//     <View style={styles.container}>
//       <Text>这是首页</Text>
//       <Button title="跳转到 Detail 页面" onPress={pressHandle} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });


// 返向传递参数，Detail 传递参数给 Home

import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation, route }) {

  function pressHandle() {
    // 跳转的同时传递参数
    navigation.navigate("DetailScreen", {
        id : 1,
        age : 18,
        name : "详情页面标题"
    });
  }

  function goToSettingHandle(){
    navigation.navigate("SettingScreen")
  }

  function openDrawerHandle(){
    navigation.openDrawer();
  }

  function closeDrawerHandle(){
    navigation.closeDrawer();
  }

  function toggleDrawerHandle(){
    navigation.toggleDrawer()
  }

  return (
    <View style={styles.container}>
      <Text>这是首页</Text>
      <Text>{route.params?.post}</Text>
      <Button title="跳转到 Detail 页面" onPress={pressHandle} />
      <View style={{
        marginTop: 10
      }}>
        <Button title="跳转到 Setting 页面" onPress={goToSettingHandle}/>
      </View>
      <View style={{
        marginTop: 10
      }}>
        <Button title="打开抽屉" onPress={openDrawerHandle}/>
      </View>
      <View style={{
        marginTop: 10
      }}>
        <Button title="关闭抽屉" onPress={closeDrawerHandle}/>
      </View>
      <View style={{
        marginTop: 10
      }}>
        <Button title="切换抽屉" onPress={toggleDrawerHandle}/>
      </View>



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