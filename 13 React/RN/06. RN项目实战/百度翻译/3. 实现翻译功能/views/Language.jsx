import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const languageArr = [
    "英语",
    "英语",
    "英语",
    "英语",
    "英语",
    "英语",
    "英语",
    "英语",
    "英语",
    "英语",
    "英语",
    "英语",
    "英语",
    "英语",
    "英语",
    "英语",
]

export default function LanguageScreen() {
    // https://icons.expo.fyi/ 查看 @expo/vector-icons 这个库各种图标的地址
    return (
        <ScrollView>
            {
                languageArr.map(function (item, index) {
                    return (
                        <Pressable key={index}>
                            {
                                index === 0 ? (
                                    <View style={[styles.lanItem, styles.selected]}>
                                        <Text style={styles.lanTitle}>{item}</Text>
                                        <AntDesign name="check" size={20} color="#555" />
                                    </View>
                                ) : (
                                    <View style={styles.lanItem}>
                                        <Text style={styles.lanTitle}>{item}</Text>
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