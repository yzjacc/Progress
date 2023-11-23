// 负责接收用户的输入，当用户点击确定按钮时，需要将输入框的内容同步到仓库里面去

import { StyleSheet, TextInput, View, Button } from "react-native";
import { useState } from "react"
import { useDispatch } from "react-redux"
import { increment } from "../redux/reducers"

export default function Input(){

    // 维护一个状态
    const [inputValue, setInputValue] = useState("");

    const dispatch = useDispatch();

    // 事件处理方法
    function pressHandle(){
        // 获取用户的输入，通过 inputValue 就能获取到
        // 调用 actionCreater 生成一个 action，然后派发到仓库里面
        dispatch(increment(inputValue));
        setInputValue("");
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="请输入内容..."
                placeholderTextColor="#999"
                value={inputValue}
                onChangeText={(t)=>setInputValue(t)}
            />
            <Button title="添加" onPress={pressHandle}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        flexDirection: "row",
        padding: 10,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    input: {
        width: 300,
        backgroundColor: "#FFF",
        height: 40,
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#DDD",
    },
})