import React, {PureComponent} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";

// 引入我们自定义的组件
import FreeDialog from "./components/FreeDialog";

// 获取屏幕的宽度
const { width } = Dimensions.get('window');

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowDialog : false, // 是否显示弹出框
    }
  }

  showDialog(){
    this.setState({
      isShowDialog : true,
    })
  }

  closeDialog(){
    this.setState({
      isShowDialog : false,
    })
  }

  renderDialog(){
    // 返回一段 JSX，在使用自定义组件的时候，传入属性
    return (
      <FreeDialog 
        isShow={this.state.isShowDialog}
        title={"年底大促"}
        content={"您的新年礼品，请查收！"}
        buttonContent={"领取新年礼物"}
        imageSource={require('./assets/dialog_bg.png')}
        closeDialog={this.closeDialog.bind(this)}
      />
    )
  }

  render(){
    return (
      // 最外层容器
      <View style={styles.container}>
        <Pressable 
          style={styles.btnContainer}
          onPress={this.showDialog.bind(this)}
        >
          <Text style={styles.textStyle}>点击弹出框</Text>
        </Pressable>
        {this.renderDialog()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  btnContainer: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#EE7942",
    height: 38,
    width: width - 100,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "#ffffff",
    fontSize: 18,
  },
});