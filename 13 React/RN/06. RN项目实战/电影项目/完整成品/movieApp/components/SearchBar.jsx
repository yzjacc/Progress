import { View, StyleSheet, Dimensions, Pressable, Text, TextInput, Keyboard } from "react-native"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSearchContent, clearSearchContent } from "../redux/slice"

const { width } = Dimensions.get('window');


export default function SearchBar({ navigation }) {

    // 维护一个状态用于存储用户的输入
    const [userInput, setUserInput] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            if (userInput) {
                dispatch(updateSearchContent(userInput))
            } else {
                dispatch(clearSearchContent())
            }
        });
        return () => {
            hideSubscription.remove();
        };
    }, [userInput]);

    function pressHandle() {
        navigation.goBack();
    }

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