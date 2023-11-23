// Animated 基本示例

// import { Text, View, StyleSheet, Button, Animated, Easing } from "react-native";
// import { useState } from "react";

// export default function App() {
//   // const [opacity, setOpacity] = useState(1);


//   const [opacity, setOpacity] = useState(new Animated.Value(1));


//   function fadeInHandle() {
//     // setOpacity(1);

//     Animated.timing(
//       // 第一个值是要针对哪个属性应用动画
//       opacity, {
//         toValue: 1,
//         duration: 1000,
//         easing: Easing.linear,
//         useNativeDriver: true
//       }
//     ).start(); // 设置动画
//     // 前面是定义动画，后面的 start 方法是播放动画
//   }

//   function fadeOutHandle() {
//     // setOpacity(0);

//     Animated.timing(
//       // 第一个值是要针对哪个属性应用动画
//       opacity, {
//         toValue: 0,
//         duration: 1000,
//         easing: Easing.linear,
//         useNativeDriver: true
//       }
//     ).start(); // 设置动画
//     // 前面是定义动画，后面的 start 方法是播放动画

//   }

//   return (
//     <View style={styles.container}>
//       {/* <View
//         style={[
//           styles.fadingContainer,
//           {
//             opacity,
//           },
//         ]}
//       >
//         <Text style={styles.fadingText}>被控制的盒子</Text>
//       </View> */}
//        <Animated.View
//         style={[
//           styles.fadingContainer,
//           {
//             opacity,
//           },
//         ]}
//       >
//         <Text style={styles.fadingText}>被控制的盒子</Text>
//       </Animated.View>
//       <View style={styles.buttonRow}>
//         <Button title="显示" onPress={fadeInHandle} />
//         <Button title="隐藏" onPress={fadeOutHandle} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   fadingContainer: {
//     padding: 20,
//     backgroundColor: "powderblue",
//   },
//   fadingText: {
//     fontSize: 28,
//   },
//   buttonRow: {
//     flexBasis: 100,
//     justifyContent: "space-evenly",
//     marginVertical: 16,
//   },
// });


// 并行执行动画

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";

/**
 * 串行动画
 */
export default class AnimatedTiming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
      rotateValue: new Animated.Value(0),
    };
  }

  onPress() {

    // 线性执行（依次执行）
    // Animated.sequence([
    //   //串行动画函数
    //   Animated.spring(this.state.bounceValue, { toValue: 1,useNativeDriver: true }), //弹性动画
    //   Animated.delay(500),
    //   Animated.timing(this.state.rotateValue, {
    //     //渐变动画
    //     toValue: 1,
    //     duration: 800,
    //     easing: Easing.out(Easing.quad),
    //     useNativeDriver: true
    //   }),
    // ]).start(() => this.onPress()); //开始执行动画

    // 并行执行（一起执行）
    Animated.parallel([
      //串行动画函数
      Animated.spring(this.state.bounceValue, { toValue: 1,useNativeDriver: true }), //弹性动画
      Animated.timing(this.state.rotateValue, {
        //渐变动画
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      }),
    ]).start(() => this.onPress()); //开始执行动画

  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              transform: [
                {
                  rotate: this.state.rotateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
                {
                  scale: this.state.bounceValue,
                },
              ],
            },
          ]}
        >
          <Text style={styles.content}>Hello World!</Text>
        </Animated.View>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={this.onPress.bind(this)}
        >
          {/* <Text style={styles.textStyle}>串行动画</Text> */}
          <Text style={styles.textStyle}>并行动画</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  content: {
    backgroundColor: "#FF0000",
    marginBottom: 10,
    padding: 10,
  },
  btnContainer: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#EE7942",
    height: 38,
    width: 320,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 18,
    color: "#ffffff",
  },
});