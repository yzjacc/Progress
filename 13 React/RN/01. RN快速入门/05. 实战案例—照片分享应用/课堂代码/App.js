import { useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

export default function App() {
  const [localUri, setLocalUri] = useState("");

  // 该函数为下方按钮的事件回掉函数
  async function openImagePickerAsync() {
    // 异步的选择图片
    // 首先第一步，我们需要获取一下权限
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      // 用户不同意
      alert("需要访问相机胶卷的权限");
      return;
    }

    // 没有进入到上面的 if，说明权限获取成功
    // 异步的打开手机的相册，让用户选择图片
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) {
      // 进入此 if，说明用户没有选择任何图片
      return;
    }

    // 如果没有进入上面的 if，说明用户选择了图片
    setLocalUri(pickerResult.uri);
  }

  // 返回上一页
  function goback(){
    setLocalUri("");
  }

  // 分享图片的回掉函数
  async function openShareImageAsync() {
    await Sharing.shareAsync(localUri);
  }

  if (localUri) {
    // 根据 localUri 来显示图片
    return (
      <View style={styles.container}>
        {/* 显示用户选择的图片 */}
        <Image source={{ uri: localUri }} style={styles.thumbnail} />
        {/* 分享照片的按钮 */}
        <TouchableOpacity style={styles.button} onPress={openShareImageAsync}>
          <Text style={styles.buttonText}>分享照片</Text>
        </TouchableOpacity>
        {/* 重新选择照片按钮 */}
        <TouchableOpacity style={styles.button} onPress={goback}>
          <Text style={styles.buttonText}>重新选择</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* logo图片 */}
      <Image source={require("./assets/logo.png")} style={styles.logo} />
      {/* 提示文字 */}
      <Text style={styles.instructions}>按下按钮，与朋友分享手机中的图片</Text>
      {/* 分享照片的按钮 */}
      <TouchableOpacity style={styles.button} onPress={openImagePickerAsync}>
        <Text style={styles.buttonText}>选择照片</Text>
      </TouchableOpacity>
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
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
