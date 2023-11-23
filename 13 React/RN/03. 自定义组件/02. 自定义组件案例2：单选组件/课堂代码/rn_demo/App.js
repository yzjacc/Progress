import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import RadioGroup from "./components/RadioGroup";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data:[{ text: "个人" }, { text: "单位" }, { text: "其他" }]
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>发票抬头</Text>
        <RadioGroup
          orientation="column"
          data={this.state.data}
          defaultValue={1} //默认选中的值
          drawablePadding={10} //图片与文字的间距
          itemChange={(index) => {
            alert(index);
          }}
        ></RadioGroup>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
  },
  title: {
    height : 30,
    fontSize: 20,
    borderColor: "black",
    marginLeft: 15,
    fontWeight: "bold",
  },
});