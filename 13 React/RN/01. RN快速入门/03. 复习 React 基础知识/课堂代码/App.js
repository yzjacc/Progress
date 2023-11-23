import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// 函数式组件
// export default function App() {
//   return (
//     <View style={styles.container}>
//         <Text>函数式组件</Text>
//       </View>
//   );
// }

// 类组件
// export default class App extends React.Component{
//   render(){
//     let name = "xiejie";
//     return (
//       <View style={styles.container}>
//         <Text>类组件{name}</Text>
//       </View>
//     )
//   }
// }


function Cat(props){
  const [count,setCount] = useState(1);
  return (
    <View>
      <Text>Hello,{props.name}! 我今年{props.age}岁！计数器{count}</Text>
      <Button title="count++" onPress={()=>{
        setCount(count+1);
      }}></Button>
    </View>
  )
}


// props
export default function App(){
  return (
    <View style={styles.container}>
      <Cat name="xiejie" age={18}></Cat>
      <Cat name="zhangsan" age={19}></Cat>
      <Cat name="lisi" age={20}></Cat>
    </View>
  )
}


// 创建样式
const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  }
});
