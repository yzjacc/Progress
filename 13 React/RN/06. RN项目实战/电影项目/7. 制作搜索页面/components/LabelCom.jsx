// 搜索页面默认内容组件

import { View, Text, StyleSheet, Pressable, Alert } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { clearAllHistory, clearOneHistory } from "../redux/slice";
import { useDispatch } from "react-redux";

export default function LabelCom(props) {
    const { title, data } = props;

    const dispatch = useDispatch();

    function clearAllHistoryHandle() {
        Alert.alert(
            "提示",
            "是否要删除所有的搜索记录",
            [{
                text: "取消"
            }, {
                text: "确定",
                onPress: () => dispatch(clearAllHistory())
            }]
        )
    }

    function clearOneHistoryHandle(index){
        Alert.alert(
            "提示",
            "是否要删除本条搜索记录",
            [{
                text: "取消"
            }, {
                text: "确定",
                onPress: () => dispatch(clearOneHistory(index))
            }]
        )
    }

    return (
        <View style={styles.container}>
            {/* 里面分为两个部分 */}
            {/* 上面部分 */}
            <View style={styles.title}>
                <Text style={styles.titleTxt}>{title}</Text>
                {
                    title === "历史搜索" ? (
                        <Pressable style={styles.clearSearchHistory} onPress={clearAllHistoryHandle}>
                            <Text style={[styles.titleTxt, {
                                marginRight: 5
                            }]}>清除历史记录</Text>
                            <AntDesign name="closecircleo" size={12} color="#666" />
                        </Pressable>
                    ) : null
                }
            </View>
            {/* 下面部分 */}
            <View style={styles.itemContainer}>
                {
                    data.map(function (item, index) {
                        return (
                            title === "历史搜索" ? (
                                <Pressable style={[styles.item, styles.historyItem]} key={index} onPress={()=>clearOneHistoryHandle(index)}>
                                    <Text style={[styles.itemTxt, {
                                        marginRight: 5
                                    }]}>{item}</Text>
                                    <AntDesign name="closecircleo" size={12} color="#666" />
                                </Pressable>
                            ) : (
                                <View style={styles.item} key={index}>
                                    <Text style={styles.itemTxt}>{item}</Text>
                                </View>
                            )
                        )
                    })
                }
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        margin: 10
    },
    title: {
        marginBottom: 15,
        // borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    titleTxt: {
        color: "#666",
    },
    clearSearchHistory: {
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        // borderWidth: 1,
    },
    itemContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    historyItem: {
        flexDirection: "row",
        alignItems: "center"
    },
    item: {
        // borderWidth: 1,
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 15,
        backgroundColor: "#ccc"
    },
    itemTxt: {
        color: "#fff",
    }
})