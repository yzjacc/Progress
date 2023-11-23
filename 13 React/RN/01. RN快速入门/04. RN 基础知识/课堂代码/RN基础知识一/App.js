import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableHighlight,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [text, setTxt] = useState("");

  function onPresshandle() {
    console.log("你点击了按钮");
  }

  return (
    // 样式的设置
    // <View style={styles.container}>
    //   <Text style={{color:"red",textDecorationLine: "underline"}}>Hello World</Text>
    //   <Text style={styles.red}>red color</Text>
    //   <Text style={styles.blue}>blue color</Text>
    //   <Text style={[styles.red,styles.blue]}>red color</Text>
    //   <View style={{ width: 50, height: 50, backgroundColor: "powderblue" }} />
    //   <View style={{ width: 100, height: 100, backgroundColor: "skyblue" }} />
    //   <View style={{ width: 150, height: 150, backgroundColor: "steelblue" }} />
    // </View>

    // flex 相关
    // <View style={styles.container}>
    //   <View style={{ flex: 1, backgroundColor: "powderblue" }}></View>
    //   <View style={{ flex: 2, backgroundColor: "skyblue" }}></View>
    //   <View style={{ flex: 3, backgroundColor: "steelblue" }}></View>
    // </View>

    // 使用百分比
    // <View style={{ height: "100%" }}>
    //   <View
    //     style={{
    //       height: "15%",
    //       backgroundColor: "powderblue",
    //     }}
    //   />
    //   <View
    //     style={{
    //       width: "66%",
    //       height: "35%",
    //       backgroundColor: "skyblue",
    //     }}
    //   />
    //   <View
    //     style={{
    //       width: "33%",
    //       height: "50%",
    //       backgroundColor: "steelblue",
    //     }}
    //   />
    // </View>

    // 尝试把 flexDirection 改为 column 看看
    // <View
    //   style={{ flex: 1, justifyContent: "space-between" }}
    // >
    //   <View style={{ width: 50, height: 50, backgroundColor: "powderblue" }} />
    //   <View style={{ width: 50, height: 50, backgroundColor: "skyblue" }} />
    //   <View style={{ width: 50, height: 50, backgroundColor: "steelblue" }} />
    // </View>

    // 本地图片和网络图片的导入
    // <View style={styles.container}>
    //   <Image source={require("./assets/ok.png")} style={styles.imgStyle}/>
    //   <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={styles.imgStyle}/>
    // </View>

    // 文本输入
    // <View style={styles.container}>
    //   <TextInput
    //     defaultValue={text}
    //     placeholder="请输入文本"
    //     onChangeText={(text) => setTxt(text)}
    //     style={styles.textInputStyle}
    //   />
    //   <Text>你输入的内容为：{text}</Text>
    // </View>

    // 按钮
    // <View style={styles.container}>
    //   <Button title="这是一个按钮" onPress={onPresshandle}/>
    // </View>

    // TouchableHighlight 示例
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          console.log("触摸效果");
        }}
        onLongPress={() => {
          console.log("长按效果");
        }}
        disabled={false} // 默认是 false，如果是 true 表示关闭该组件的触摸功能
        onPressIn={() => {
          console.log("触摸开始");
        }}
        onPressOut={() => {
          console.log("触摸结束");
        }}
      >
        <View
          style={{
            width: 200,
            height: 50,
            alignItems: "center",
            backgroundColor: "#2196F3",
          }}
        >
          <Text style={{ color: "#fff", lineHeight: 50, fontSize: 20 }}>
            this is a button
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "red",
    textDecorationLine: "underline",
  },
  red: {
    color: "red",
    fontSize: 20,
    fontWeight: "300",
  },
  blue: {
    color: "blue",
  },
  imgStyle: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "#f00",
  },
  textInputStyle: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
  },
});
