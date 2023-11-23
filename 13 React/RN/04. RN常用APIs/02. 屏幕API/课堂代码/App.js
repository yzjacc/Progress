// Dimensions

// import React, {Component} from 'react';
// import {View, StyleSheet, Text, Dimensions} from 'react-native';

// const {width} = Dimensions.get('window');
// const {height} = Dimensions.get('window');
// const {scale} = Dimensions.get('window');

// export default class NetInfoPage extends Component {

//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.textStyle}>屏幕宽：{width}</Text>
//                 <Text style={styles.textStyle}>屏幕高：{height}</Text>
//                 <Text style={styles.textStyle}>Scale：{scale}</Text>
//                 <View style={{
//                   width: width,
//                   height: 200,
//                   backgroundColor: 'red'
//                 }}></View>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#F5FCFF'
//     },
//     btnContainer: {
//         marginTop: 100,
//         marginLeft: 10,
//         marginRight: 10,
//         backgroundColor: '#EE7942',
//         height: 38,
//         borderRadius: 5,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     textStyle: {
//         fontSize: 28
//     }
// });

// PixelRatio

import React, { Component } from "react";
import { View, StyleSheet, Text, PixelRatio } from "react-native";

const dpr = PixelRatio.get();

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>DPR：{dpr}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  textStyle: {
    fontSize: 28,
  },
});