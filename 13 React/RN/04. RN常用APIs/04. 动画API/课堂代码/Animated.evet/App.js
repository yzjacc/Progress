import {
  ScrollView,
  Animated,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useState } from "react";

const { width } = Dimensions.get("window");

export default function App(){

  // 创建一个状态值用于控制水平的偏移
  const [xOffset, setXOffset] = useState(new Animated.Value(1));

  // 在滚动的时候会执行该事件处理函数
  // function onScrollHandle(event){
  //   console.log(event.nativeEvent.contentOffset.x);
  // }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        style={styles.imageStyle}
        // onScroll={onScrollHandle}
        // xOffset 的变化范围就变成了 0-392
        onScroll={Animated.event([{
          nativeEvent: {contentOffset : {x : xOffset}}
        }],{useNativeDriver : false})}
      >
        {/* 第一张图片 */}
        <Animated.Image 
          style={[styles.imageStyle, {
            opacity: xOffset.interpolate({
              inputRange : [0, 392],
              outputRange : [1, 0]
            })
          }]}
          source={{
            uri: "http://doc.zwwill.com/yanxuan/imgs/banner-1.jpg"
          }}
          resizeMode="cover"
        />
        {/* 第二张图片 */}
        <Image 
          style={styles.imageStyle}
          source={{
            uri: "http://doc.zwwill.com/yanxuan/imgs/banner-2.jpg"
          }}
          resizeMode="cover"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 44,
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  imageStyle: {
    height: 200,
    width: width,
  },
});
