// import { Pressable, StyleSheet, Text, View} from "react-native";

// export default function App(){

//   function onPressHandle(){
//     console.log("Pressed");
//   }

//   function onPressInHandle(){
//     console.log("Pressed In");
//   }

//   function onPressOutHandle(){
//     console.log("Pressed Out");
//   }

//   function onLongPressHandle(){
//     console.log("Long Pressed");
//   }

//   return (
//     <View style={styles.container}>
//       <Pressable
//         onPress={onPressHandle}
//         onPressIn={onPressInHandle}
//         onPressOut={onPressOutHandle}
//         onLongPress={onLongPressHandle}
//         style={({pressed})=>{
//           if(pressed){
//             return styles.pressdStyle;
//           } else {
//             return styles.unPressdStyle;
//           }
//         }}
//         hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
//       >
//         {/* 可以根据是否按压来决定 Text 的样式 */}
//         {({pressed})=>{
//           if(pressed){
//             return (
//               <Text style={{
//                 textAlign: "center",
//                 color : "white",
//                 lineHeight: 100
//               }}>Pressd</Text>
//             );
//           } else {
//             return (
//               <Text style={{
//                 textAlign: "center"
//               }}>unPress</Text>
//             );
//           }
//         }}
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   pressdStyle: {
//     backgroundColor: "rgb(210, 230, 255)",
//     height: 100,
//     lineHeight: "100",
//   },
//   unPressdStyle: {
//     backgroundColor: "#ccc",
//   },
// })


// 下面是官网的示例
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const App = () => {
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = "";
  if (timesPressed > 1) {
    textLog = timesPressed + "x onPress";
  } else if (timesPressed > 0) {
    textLog = "onPress";
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setTimesPressed((current) => current + 1);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
          },
          styles.wrapperCustom,
        ]}
      >
        {({ pressed }) => (
          <Text style={styles.text}>{pressed ? "Pressed!" : "Press Me"}</Text>
        )}
      </Pressable>
      <View style={styles.logBox}>
        <Text testID="pressable_press_console">{textLog}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9",
  },
});

export default App;