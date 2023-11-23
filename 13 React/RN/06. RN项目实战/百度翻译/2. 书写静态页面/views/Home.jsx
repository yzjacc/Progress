import { StyleSheet, Text, View, StatusBar, TextInput, Pressable } from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4b3c96" />
            {/* 上面翻译成哪一国语言 */}
            <View style={styles.lan}>
                <Text style={styles.lanTxt}>翻译为
                    <Text style={{
                        color: "#1c1b21",
                        fontWeight: "900"
                    }}>英语</Text>
                </Text>
            </View>
            {/* 输入要翻译的文本 */}
            <TextInput 
                multiline
                numberOfLines={10}
                placeholder="请输入您要翻译的文本"
                placeholderTextColor="#c7c7c7"
                style={styles.txtInput}
                textAlignVertical="top"
            />
            {/* 显示译文区域，可以点击 */}
            <Pressable
                style={styles.resultContainer}
            >
                <Text style={styles.resultTitle}>译文：</Text>
                <Text>this is a test</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lan:{
        width: 100,
        height: 30,
        paddingLeft: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    lanTxt : {
        color:"#888",
        fontSize: 14
    },
    txtInput:{
        borderColor: "grey",
        borderBottomWidth: 1,
        backgroundColor : "#fff",
        padding: 10,
        paddingTop: 15,
        flex: 0.7
    },
    resultContainer: {
        flex: 1,
        padding: 10
    },
    resultTitle : {
        fontSize: 18,
        marginBottom: 10
    }
});