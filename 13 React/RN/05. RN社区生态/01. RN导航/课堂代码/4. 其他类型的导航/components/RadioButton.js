import React, {PureComponent} from "react";
import {View, Pressable, Text, Image, StyleSheet} from "react-native";
let selectedImage = require("../assets/radio_selected.png");
let unSelectedImage = require("../assets/radio_select.png");

export default class RadioButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected : this.props.selected,
      selectedTextColor : "#f83d2b",
      unSelectedTextColor : "#333333",
    }
    // 从父组件获取到传递过来的方法
    this.selectedChanged = props.selectedChanged
  }

  pressHandle(){
    this.selectedChanged(this.state.selected);
    this.setState({
      selected : !this.state.selected,
    })
  }

  // 设置当前组件是否被选中
  setSelectState(selected){
    this.setState({
      selected : selected,
    })
  }


  render(){
    const {text, drawablePadding} = this.props;
    return (
      <Pressable
        onPress={this.pressHandle.bind(this)}
      >
        <View style={styles.radioStyle}>
          {/* 左边图片 */}
          <Image 
            style={styles.image}
            source={this.state.selected ? selectedImage : unSelectedImage}
          />
          {/* 右边文字 */}
          <Text style={{
            color: this.state.selected ? this.state.selectedTextColor : this.state.unSelectedTextColor,
            marginLeft: drawablePadding,
            fontSize : 18,
          }}>{text}</Text>
        </View>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  radioStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 22,
    height: 22,
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
  },
});