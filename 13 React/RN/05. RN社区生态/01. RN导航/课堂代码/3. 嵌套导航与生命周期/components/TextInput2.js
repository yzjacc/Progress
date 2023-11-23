import {useState} from "react"
import {TextInput, StyleSheet, Text, View} from "react-native"

export default function App(){

  const [text, setText] = useState("");
  const [show, isShow] = useState(false);

  function showOption(newVal){
    setText(newVal);
    isShow(true);
  }


  function hideOption(newVal){
    setText(newVal);
    isShow(false);
  }

  return (
    <View style={styles.container}>
      {/* 搜索框 */}
      <View style={styles.searchContainer}>
        {/* 输入框 */}
        <TextInput 
          style={styles.inputStyle}
          placeholder="请输入关键字"
          returnKeyType="search"
          value={text}
          onChangeText={(t)=>showOption(t)}
        />
        {/* 搜索按钮 */}
        <View style={styles.btnStyle}>
          <Text style={styles.search} onPress={()=>alert(text)}>搜索</Text>
        </View>
      </View>
      {/* 在搜索框下面显示联想效果 */}
      {
        show ? (
          <View style={styles.resultStyle}>
            <Text style={styles.itemStyle} numberOfLines={1} onPress={()=>hideOption(text+"街道")}>{text}街道</Text>
            <Text style={styles.itemStyle} numberOfLines={1} onPress={()=>hideOption(text+"道路")}>{text}道路</Text>
            <Text style={styles.itemStyle} numberOfLines={1} onPress={()=>hideOption('80' + text+"车站")}>80{text}车站</Text>
          </View>
        ) : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingTop: 25,
  },
  searchContainer: {
    height: 45,
    flexDirection: "row",
  },
  inputStyle: {
    height: 45,
    flex: 1,
    marginTop: 20,
    borderWidth: 1,
    marginLeft: 10,
    paddingLeft: 5,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  btnStyle: {
    width: 80,
    marginTop: 20,
    marginLeft: -5,
    marginRight: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#23BEFF",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  resultStyle: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    height: 200,
    borderColor: "#ccc",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  itemStyle: {
    fontSize: 16,
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderTopWidth: 0,
  },
});