import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";

const App = () => {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const bodyText = "This is not really a bird nest.";

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };

  const [count, setCount] = useState(0);

  return (
    // 1. View 组件
    // <View
    //   style={{
    //     flexDirection: "row",
    //     padding: 20,
    //     flexWrap: "wrap",
    //     justifyContent: "space-between",
    //     borderWidth: 1,
    //   }}
    // >
    //   <View style={styles.item} />
    //   <View style={styles.item} />
    //   <View style={styles.item} />
    //   <View style={styles.item} />
    //   <View style={styles.item} />
    //   <View style={styles.item} />
    //   <View style={styles.item} />
    //   <View style={styles.item} />
    //   <View style={styles.item} />
    //   <View style={styles.item} />
    // </View>

    // 2. Text 组件
    // <View style={{
    //   marginTop: 20,
    // }}><Text>nihao</Text></View>

    // <View style={styles.container}>
    //   <Text style={styles.baseText}>
    //     {/* 除了继承 baseText 样式以外，有自己的样式 */}
    //     <Text style={styles.titleText} onPress={onPressTitle}>
    //       {titleText}
    //       {"\n"}
    //       {"\n"}
    //     </Text>
    //     {/* 继承 baseText 的样式 */}
    //     <Text numberOfLines={5}>{bodyText}</Text>
    //   </Text>
    // </View>

    // <View style={{ flex: 1, justifyContent: "center" }}>
    //   <View>
    //     <Text style={{ fontSize: 40, borderWidth: 1 }}>1</Text>
    //     <Text style={{ fontSize: 40, borderWidth: 1 }}>2</Text>
    //     <Text style={{ fontSize: 40, borderWidth: 1 }}>3</Text>
    //   </View>
    //   <View style={{ flexDirection: "row" }}>
    //     <Text style={{ fontSize: 40, borderWidth: 1 }}>1</Text>
    //     <Text style={{ fontSize: 40, borderWidth: 1 }}>2</Text>
    //     <Text style={{ fontSize: 40, borderWidth: 1 }}>3</Text>
    //   </View>
    // </View>

    // <p>this is a <span>test,this</span> is a test</p>
    // <View style={styles.container}>
    //   {/* Text 组件如何外面套一个 Text 组件，那么会在一行显示 */}
    //   <Text>
    //     <Text style={{ fontSize: 28, color: "#999" }}>First part</Text>
    //     <Text>and</Text>
    //     <Text style={{ fontSize: 20, color: "red" }}>second part</Text>
    //   </Text>
    //   <View>
    //     <Text>First part and </Text>
    //     <Text>second part</Text>
    //   </View>
    // </View>

    //被嵌套组件与位置相关的 style 样式几乎都不生效。
    // <View style={{ marginTop: 20 }}>
    //   <Text style={{ fontSize: 28 }}>
    //     我是一段普通文字
    //     <Text style={{ paddingLeft: 10, borderWidth: 1 }}>左Padding 10</Text>
    //     <Text style={{ marginLeft: 10, borderWidth: 1 }}>左Margin 10</Text>
    //   </Text>
    // </View>

    // 内嵌 Text 的 numberOfLines 属性会失效。
    // <View style={{ marginTop: 20 }}>
    //   <Text style={{ fontSize: 28, borderWidth: 1 }} numberOfLines={1} ellipsizeMode={"tail"}>
    //     我是一段普通文字我是一段普通文字我是一段普通文字我是一段普通文字我是一段普通文字
    //     {/* <Text numberOfLines={2} ellipsizeMode={"tail"}>
    //       我是一段普通文字我是一段普通文字我是一段普通文字我是一段普通文字我是一段普通文字
    //     </Text> */}
    //   </Text>
    // </View>

    // <View style={{ marginTop: 20 }}>
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       marginTop: 10,
    //       borderWidth: 1,
    //       alignItems: "center",
    //     }}
    //   >
    //     <Text style={{ fontSize: 20 }}>我是文字</Text>
    //     <Text style={{ fontSize: 30 }}>我是大一点的文字</Text>
    //   </View>
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       marginTop: 10,
    //       borderWidth: 1,
    //       alignItems: "flex-start",
    //     }}
    //   >
    //     <Text style={{ fontSize: 20 }}>我是文字</Text>
    //     <Text style={{ fontSize: 30 }}>我是大一点的文字</Text>
    //   </View>
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       marginTop: 10,
    //       borderWidth: 1,
    //       alignItems: "flex-end",
    //     }}
    //   >
    //     <Text style={{ fontSize: 20 }}>我是文字</Text>
    //     <Text style={{ fontSize: 30 }}>我是大一点的文字</Text>
    //   </View>
    // </View>

    // Touchable 系列按钮
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.touchableStyle}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.txtStyle}>点击加1</Text>
      </TouchableHighlight>

      <TouchableOpacity
        style={styles.touchableStyle}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.txtStyle}>点击加1</Text>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={() => setCount(count + 1)}>
        <View style={styles.touchableStyle}>
          <Text style={styles.txtStyle}>点击加1</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableNativeFeedback onPress={() => setCount(count + 1)}>
        <View style={styles.touchableStyle}>
          <Text style={styles.txtStyle}>点击加1</Text>
        </View>
      </TouchableNativeFeedback>

      <Text style={[styles.countText]}>{count !== 0 ? count : null}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // item: {
  //   width: 50,
  //   height: 50,
  //   borderWidth: 1,
  //   margin: 10,
  // },
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // baseText: {
  //   fontSize: 30,
  // },
  // titleText: {
  //   fontSize: 20,
  //   fontWeight: "400",
  // },
  // innerText: {
  //   color: "red",
  // },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  touchableStyle: {
    width: 300,
    height: 38,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06C1AE",
    marginTop: 20,
    marginBottom: 20,
  },
  txtStyle: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
  },
  countText: {
    marginTop: 10,
    alignSelf: "center",
    fontSize: 38,
    color: "#06C1AE",
  },
});

export default App;
