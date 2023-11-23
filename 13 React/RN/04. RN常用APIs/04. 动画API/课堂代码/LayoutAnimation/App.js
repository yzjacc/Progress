import { View, StyleSheet, Text, Pressable, UIManager, LayoutAnimation } from "react-native";
import { useState } from "react";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// 定义动画
const customAnime = {
  // 第一个动画
  customSpring : {
    duration : 1000,
    create : {
      springDamping : 0.3, // 弹跳动画阻尼系数
      type : LayoutAnimation.Types.spring, // 动画类型
      property: LayoutAnimation.Properties.scaleXY // 动画属性
    },
    update : {
      springDamping : 0.6, // 弹跳动画阻尼系数
      type : LayoutAnimation.Types.spring, // 动画类型
      property: LayoutAnimation.Properties.scaleXY // 动画属性
    }
  },
  // 第二个动画
  customLinear : {
    duration : 500,
    create : {
      springDamping : 0.6, // 弹跳动画阻尼系数
      type : LayoutAnimation.Types.linear, // 动画类型
      property: LayoutAnimation.Properties.opacity // 动画属性
    },
    update : {
      springDamping : 0.6, // 弹跳动画阻尼系数
      type : LayoutAnimation.Types.linear, // 动画类型
      property: LayoutAnimation.Properties.opacity // 动画属性
    }
  }
}

export default function App() {
  // 定义状态
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [whichAnime, setWhichAnime] = useState(true);

  function pressHandle() {
    whichAnime ? 
    LayoutAnimation.configureNext(customAnime.customSpring) :
    LayoutAnimation.configureNext(customAnime.customLinear) ;
    // 传入动画配置对象
    setWidth(width + 20);
    setHeight(height + 20);
    setWhichAnime(!whichAnime);
  }

  return (
    <View style={styles.container}>
      {/* 上面一个方块 */}
      <View
        style={[
          styles.content,
          {
            width,
            height,
          },
        ]}
      ></View>
      {/* 下面一个按钮 */}
      <Pressable style={styles.btnContainer} onPress={pressHandle}>
        <Text style={styles.textStyle}>点击增大</Text>
      </Pressable>
    </View>
  );
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
    marginBottom: 30,
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
