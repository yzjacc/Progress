import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Dimensions,
} from "react-native";
import { useState } from "react";

// 获取屏幕宽度
const windowWidth = Dimensions.get("window").width;

// 图片链接
const images = new Array(6).fill(
  "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
);

// const imagesURL = "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80";

export default function App() {
  // 维护一个状态
  const [scrollX] = useState(new Animated.Value(0));

  // function scrollHandle(event){
  //   console.log(event.nativeEvent.contentOffset.x)
  // }

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        {/* 上面滑动图片部分 */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          // 当我们滚动图片的时候，会有一个实时的 x 变化，我们将这个 x 变化的值映射到 scrollX
          onScroll={Animated.event([{
            nativeEvent : {
              contentOffset : {
                x : scrollX
              }
            }
          }],{useNativeDriver : false})}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth, height: 250 }}
                key={imageIndex}
              >
                <ImageBackground source={{ uri: image }} style={styles.card}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {"Image - " + (imageIndex + 1)}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
        {/* 下面小圆点部分 */}
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            // 我们需要根据 scrollX 的变化动态的修改小圆点的 width
            
            // 小圆点宽度的映射计算关系如下：
            // 刚开始的时候，scrollX = 0
            // 对于不同的小圆点，根据 scrollX 的映射关系对应的宽度是不一样的

            // 第一个小圆点 0
            // inputRange[-392, 0, 392]
            // outputRange[8, 16, 8]
            // 第二个小圆点 1
            // inputRange[0, 392, 392*2]
            // outputRange[8, 16, 8]

            // 第三个小圆点2
            // inputRange[392, 392*2, 392*3]
            // outputRange[8,16,8]
            return <Animated.View key={imageIndex} style={[styles.normalDot, {
              width : scrollX.interpolate({
                inputRange : [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange :[8, 16, 8],
                extrapolate : "clamp" // 不进行增量计算
              })
            }]} />;
          })}
        </View>
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
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
