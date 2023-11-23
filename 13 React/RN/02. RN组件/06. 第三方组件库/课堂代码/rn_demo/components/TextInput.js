import {View, TextInput, StyleSheet} from "react-native";
import {useState} from "react"

export default function App(){
  const [text, setText] = useState("");
  const [num, setNum] = useState(null);


  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="请输入内容"
        value={text}
        onChangeText={(t)=>setText(t)}
      />
       <TextInput 
        style={styles.input} 
        placeholder="请输入数字"
        value={num}
        onChangeText={(t)=>setNum(t)}
        keyboardType="numeric"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});