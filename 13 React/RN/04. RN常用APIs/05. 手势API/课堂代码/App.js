// PanResponder 基本示例

// import {View, StyleSheet, PanResponder} from "react-native";

// export default function App(){

//   const panResponder = PanResponder.create({
//     // 触摸事件开始
//     onStartShouldSetPanResponder: function(){
//       console.log("触摸开始");
//       return true;
//     },
//     // move 事件，手指移动的时候会实时的触发
//     onPanResponderMove: function(e, gs){
//       // console.log("moving");

//       console.log(`正在移动: X轴: ${gs.dx}, Y轴: ${gs.dy}`);
//     },
//     onPanResponderRelease: function(e, gs){
//       // console.log("release");

//       if(gs.dx > 50){
//         console.log("由左往右");
//       } else if(gs.dx < -50){
//         console.log("由右往左");
//       } else if(gs.dy < -50){
//         console.log("由下往上");
//       } else if(gs.dy > 50){
//         console.log("由上往下");
//       }
//     }
//   });

//   // 通过 create 返回的对象的 panHandlers 属性可以拿到整个触摸事件的集合对象
//   // console.log(panResponder.panHandlers);

//   return (
//     <View style={styles.container}>
//       <View style={styles.box} {...panResponder.panHandlers}></View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   box: {
//     backgroundColor: "#61dafb",
//     width: 80,
//     height: 80,
//     borderRadius: 4,
//   },
// });

// 拖动小方块示例
import {View, StyleSheet, PanResponder, Animated} from "react-native";
// import {useState} from "react";

export default function App(){

  // 维护一个状态，该状态记录了一个 x 轴和 y 轴的移动距离
  // const [transXY] = useState(new Animated.ValueXY());

  const pan = new Animated.ValueXY();
  console.log(pan);
  // console.log("transXY:", transXY);


  const panResponder = PanResponder.create({
    // 触摸事件开始
    onStartShouldSetPanResponder: function(){
      console.log("触摸开始");
      return true;
    },

    // onPanResponderGrant: () => {
    //   pan.setOffset({
    //     x: pan.x._value,
    //     y: pan.y._value
    //   });
    // },

    // move 事件，手指移动的时候会实时的触发
    // 这边我们要做的事情，就是将 dx，dy 映射到 transXY 里面
    onPanResponderMove: Animated.event([null,{
      dx: pan.x,
      dy: pan.y
    }],{useNativeDriver : false}),


    onPanResponderRelease: function(e, gs){
      // console.log("release");

      // if(gs.dx > 50){
      //   console.log("由左往右");
      // } else if(gs.dx < -50){
      //   console.log("由右往左");
      // } else if(gs.dy < -50){
      //   console.log("由下往上");
      // } else if(gs.dy > 50){
      //   console.log("由上往下");
      // }

      // pan.flattenOffset();

      Animated.spring(pan, {
        toValue : {x : 0, y:0},
        useNativeDriver : false
      }).start();

    }


  });

  // 通过 create 返回的对象的 panHandlers 属性可以拿到整个触摸事件的集合对象
  // console.log(panResponder.panHandlers);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[styles.box, {
          transform: [
            {translateX: pan.x},
            {translateY: pan.y},
          ]
        }]} 
        {...panResponder.panHandlers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#61dafb",
    width: 80,
    height: 80,
    borderRadius: 4,
  },
});