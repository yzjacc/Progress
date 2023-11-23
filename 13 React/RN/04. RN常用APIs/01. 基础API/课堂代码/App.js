// Alert 示例
// import {View, StyleSheet, Button, Alert} from "react-native"

// export default function App(){

//   function btnHandle1(){
//     Alert.alert(
//       "警告框标题",
//       "你真的打算删除么？",
//       [{
//         text : "取消",
//         onPress : ()=>{
//           console.log("点击了取消按钮");
//         },
//         style : "cancel"
//       },{
//         text : "确定",
//         onPress : ()=>{
//           console.log("点击了确定按钮");
//         },
//       }]
//     )
//   }

//   function btnHandle2(){
//     Alert.alert(
//       "警告框标题2",
//       "你真的打算删除么2？",
//       [{
//         text: "一会儿在询问我",
//         onPress: () => console.log("Ask me later pressed")
//       },{
//         text : "取消",
//         onPress : ()=>{
//           console.log("点击了取消按钮");
//         },
//         style : "cancel"
//       },
//       {
//         text : "确定",
//         onPress : ()=>{
//           console.log("点击了确定按钮");
//         },
//       }]
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <Button title="按钮1" onPress={btnHandle1}/>
//       <Button title="按钮2" onPress={btnHandle2}/>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "space-around",
//     alignItems: "center"
//   }
// });


// transform 示例

// import React from "react";
// import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

// const App = () => (
//   <SafeAreaView style={styles.container}>
//     <ScrollView
//       contentContainerStyle={styles.scrollContentContainer}
//     >
//       <View style={styles.box}>
//         <Text style={styles.text}>Original Object</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ scale: 2 }]
//       }]}>
//         <Text style={styles.text}>Scale by 2</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ scaleX: 2 }]
//       }]}>
//         <Text style={styles.text}>ScaleX by 2</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ scaleY: 2 }]
//       }]}>
//         <Text style={styles.text}>ScaleY by 2</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ rotate: "45deg" }]
//       }]}>
//         <Text style={styles.text}>Rotate by 45 deg</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [
//           { rotateX: "45deg" },
//           { rotateZ: "45deg" }
//         ]
//       }]}>
//         <Text style={styles.text}>Rotate X&Z by 45 deg</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [
//           { rotateY: "45deg" },
//           { rotateZ: "45deg" }
//         ]
//       }]}>
//         <Text style={styles.text}>Rotate Y&Z by 45 deg</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ skewX: "45deg" }]
//       }]}>
//         <Text style={styles.text}>SkewX by 45 deg</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ skewY: "45deg" }]
//       }]}>
//         <Text style={styles.text}>SkewY by 45 deg</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [
//           { skewX: "30deg" },
//           { skewY: "30deg" }
//         ]
//       }]}>
//         <Text style={styles.text}>Skew X&Y by 30 deg</Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ translateX: -50 }]
//       }]}>
//         <Text style={styles.text}>TranslateX by -50 </Text>
//       </View>

//       <View style={[styles.box, {
//         transform: [{ translateY: 50 }]
//       }]}>
//         <Text style={styles.text}>TranslateY by 50 </Text>
//       </View>
//     </ScrollView>
//   </SafeAreaView>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   scrollContentContainer: {
//     alignItems: "center",
//     paddingBottom: 60
//   },
//   box: {
//     height: 100,
//     width: 100,
//     borderRadius: 5,
//     marginVertical: 40,
//     backgroundColor: "#61dafb",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   text: {
//     fontSize: 14,
//     fontWeight: "bold",
//     margin: 8,
//     color: "#000",
//     textAlign: "center"
//   }
// });

// export default App;

// keyboard 键盘 api

// import React, { useState, useEffect } from "react";
// import { Keyboard, Text, TextInput, StyleSheet, View } from "react-native";

// const Example = () => {
//   const [keyboardStatus, setKeyboardStatus] = useState(undefined);

//   useEffect(() => {
//     const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
//       setKeyboardStatus("键盘出来了");
//     });
//     const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
//       setKeyboardStatus("键盘隐藏了");
//     });

//     return () => {
//       // 该函数会在执行下一次副作用之前执行
//       // 将上一次绑定的事件移除
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   return (
//     <View style={style.container}>
//       <TextInput
//         style={style.input}
//         placeholder='Click here…'
//         onSubmitEditing={Keyboard.dismiss}
//       />
//       <Text style={style.status}>{keyboardStatus}</Text>
//     </View>
//   );
// }

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 36
//   },
//   input: {
//     padding: 10,
//     borderWidth: 0.5,
//     borderRadius: 4
//   },
//   status: {
//     padding: 10,
//     textAlign: "center"
//   }
// });

// export default Example;

// AppState

import React, { useRef, useState, useEffect } from "react";
import { AppState, StyleSheet, Text, View } from "react-native";

const AppStateExample = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Current state is: {appStateVisible}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppStateExample;