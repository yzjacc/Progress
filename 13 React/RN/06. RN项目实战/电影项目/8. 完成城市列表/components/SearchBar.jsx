// 搜索页面的头部组件

import { View, StyleSheet, Dimensions, Pressable, Text, TextInput, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSearchContent } from "../redux/slice";


// 获取屏幕的宽度
const { width } = Dimensions.get("window");

export default function SearchBar({navigation}) {

    // 维护一个状态用户和输入框绑定在一起
    const [userInput, setUserInput] = useState("")

    const dispatch = useDispatch();

    function pressHandle(){
        navigation.goBack();
    }


    useEffect(function(){

        const hideSubscription = Keyboard.addListener("keyboardDidHide", function(){
            // 将用户输入的内容同步到仓库里面
            dispatch(updateSearchContent(userInput));
        })

        return ()=>{
            hideSubscription.remove();
        }

    }, [userInput])


    return (
        <View style={styles.headerStyle}>
            <TextInput
                style={styles.searchBar}
                placeholder="搜影片、影院、演出、视频、资讯"
                value={userInput}
                onChangeText={setUserInput}
            />
            <Pressable onPress={pressHandle}>
                <Text style={styles.cancelBtnTxt}>取消</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: "#ffffff",
        height: 52,
        width: width,
        paddingHorizontal: 25,
        flexDirection: 'row',
        // borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    cancelBtnTxt: {
        fontSize: 16,
    },
    searchBar: {
        width: width * 0.7,
        height: 38,
        borderRadius: 3,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        alignSelf: 'center',
        paddingLeft: 10,
    },
});