import { View, Text, StyleSheet, Image,Pressable } from "react-native"

export default function MovieSearchItem(props) {
    const { item, navigation } = props

    function pressHandle(){
        navigation.navigate("MovieDetail", {
            id : item.id
        })
    }

    return (
        <Pressable style={styles.container} onPress={pressHandle}>
            {/* 左边部分 */}
            <View style={styles.imgContainer}>
                <Image
                    source={{
                        uri: item.movieImg
                    }}
                    style={styles.imgStyle}
                />
            </View>
            {/* 右侧部分 */}
            <View style={styles.movieInfoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.score}>
                    {item.average == 0 ? "暂无评分" : item.average + " 分"}
                </Text>
                <Text style={styles.commonStyle}>
                    上映日期: {item.year}
                </Text>
                <Text style={styles.commonStyle}>
                    导演: {item.directors}
                </Text>
                <Text style={styles.commonStyle}>
                    主演: {item.casts.length > 14 ? item.casts.slice(0, 14) + "..." : item.casts}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: 120,
        marginBottom: 15,
        paddingBottom: 10,
        borderColor: "#bbb"
    },
    imgContainer: {
        width: "30%",
        height: "100%",
        // borderWidth: 1,
    },
    imgStyle: {
        width: 100,
        height: "100%",
        resizeMode: 'contain'
    },
    movieInfoContainer: {
        width: "70%",
        height: "100%",
        // borderWidth: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "900",
        marginBottom: 5
    },
    score: {
        fontSize: 14,
    },
    commonStyle: {
        fontSize: 12,
        marginTop: 4,
        color: "#555"
    },
})