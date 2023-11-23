import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux"
import {changeLan} from "../redux/slice"

export default function LanguageScreen() {
    // https://icons.expo.fyi/ 查看 @expo/vector-icons 这个库各种图标的地址


    // 获取语言列表
    const lanList = useSelector((state)=>state.translate.lanList);
    // 获取当前选中的语言
    const curIndex = useSelector((state)=>state.translate.curIndex);

    const dispatch = useDispatch();

    function pressHandle(index){
        // 派发一个 action
        dispatch(changeLan(index));
    }

    return (
        <ScrollView>
            {
                lanList.map(function (item, index) {
                    return (
                        <Pressable key={index} onPress={()=>pressHandle(index)}>
                            {
                                index === curIndex ? (
                                    <View style={[styles.lanItem, styles.selected]}>
                                        <Text style={styles.lanTitle}>{item.chs}</Text>
                                        <AntDesign name="check" size={20} color="#555" />
                                    </View>
                                ) : (
                                    <View style={styles.lanItem}>
                                        <Text style={styles.lanTitle}>{item.chs}</Text>
                                    </View>
                                )
                            }
                        </Pressable>
                    )
                })
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    lanItem: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: "#aaa",
        paddingLeft: 10
    },
    selected : {
        paddingRight: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    lanTitle: {
        lineHeight: 50,
        color: "#555"
    }
});