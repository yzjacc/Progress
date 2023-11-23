import { View, Text, StyleSheet, Dimensions, ScrollView, Image, Pressable } from "react-native"
import { useState, useEffect } from "react";
import { Video } from "expo-av";

// 引入 api
import { findMovieByIdApi } from "../api/Service"

// 引入自定义组件
import LoadingCom from "../components/LoadingCom"


const { width, height } = Dimensions.get("window");

export default function MovieDetailScreen({ route }) {

    const { id } = route.params;

    // 跳转过来的时候，会有一个电影的 id 传递过来
    // 正常情况下，我们需要根据这个 id 发送请求获取对应 id 的电影信息

    // 维护一个状态用来保存电影信息
    const [movieInfo, setMovieInfo] = useState({});
    // 内容是否加载
    const [loaded, setLoaded] = useState(false);
    // 高度是否 auto
    const [isAutoHeight, setAutoHeight] = useState(false);

    useEffect(function () {
        findMovieByIdApi(id)
            .then(res => {
                setMovieInfo(res);
                setLoaded(!loaded);
            })
    }, [id])

    function pressHandle() {
        setAutoHeight(!isAutoHeight);
    }

    return (
        loaded === false ? <LoadingCom /> : (
            <View>
                {/* 分为上面部分和下面部分 */}
                {/* 上面部分视频 */}
                <View style={styles.vdContainer}>
                    <Video
                        style={styles.video}
                        source={{
                            uri: movieInfo.vd
                        }}
                        resizeMode="contain"
                        shouldPlay={true}
                        useNativeControls
                    />
                </View>
                {/* 下面部分是可滚动区域（电影的详细信息） */}
                <ScrollView style={styles.container}>
                    <View style={styles.headerContainer}>
                        {/* 分为上面电影信息 */}
                        <View style={styles.headerTop}>
                            {/* 里面又可以分为左右两个部分 */}
                            {/* 左侧海报 */}
                            <View style={styles.headerLeft}>
                                <Image
                                    style={styles.movieImg}
                                    source={{
                                        uri: movieInfo.movieImg
                                    }}
                                />
                            </View>
                            {/* 右侧电影信息 */}
                            <View style={styles.headerRight}>
                                <Text style={styles.title}>{movieInfo.title}</Text>
                                <Text style={styles.score}>{movieInfo.average == 0 ? "暂无评分" : movieInfo.average + "分"}</Text>
                                <Text style={styles.commonStyle}>上映日期{movieInfo.year}</Text>
                                <Text style={styles.commonStyle}>{movieInfo.genres}</Text>
                                <Text style={styles.commonStyle}>导演：{movieInfo.directors}</Text>
                                <Text style={styles.commonStyle}>主演：{movieInfo.casts.length > 13 ? movieInfo.casts.slice(0, 13) + "..." : movieInfo.casts}</Text>
                            </View>
                        </View>
                        {/* 下面的两个按钮 */}
                        <View style={styles.headerBottom}>
                            <View style={styles.priceStyle}>
                                <Image style={styles.priceImage} source={require('../assets/likeit_default.png')} />
                                <Text style={styles.priceTxt}>想看</Text>
                            </View>
                            <View style={styles.priceStyle}>
                                <Image style={styles.priceImage} source={require('../assets/star_default.png')} />
                                <Text style={styles.priceTxt}>看过</Text>
                            </View>
                        </View>
                    </View>
                    <Pressable style={[styles.movieIntroContainer, isAutoHeight ? styles.autoHeight : ""]} onPress={pressHandle}>
                        <Text style={styles.movieIntroTxt}>{movieInfo.summary.replace(/<p>([^<]*?)<\/p>/gi, '$1')}</Text>
                    </Pressable>
                </ScrollView>
                {/* 选座按钮 */}
                <View style={styles.selectSeatBtnContainer}>
                    <Pressable style={styles.selectSeatBtn}>
                        <Text style={styles.selectSeatBtnTxt}>选座购票</Text>
                    </Pressable>
                </View>
            </View>
        )

    )
}

const styles = StyleSheet.create({
    vdContainer: {
        width: "100%",
        height: 230,
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        alignSelf: 'center',
        width: 400,
        height: 230,
    },
    container: {
        borderWidth: 1,
        height: height - 230 - 80, // 减去视频区域的高度 230 以及头部区域的高度 80
    },
    headerContainer: {
        width: "100%",
        height: 220,
        // borderWidth: 1,
        marginTop: 10
    },
    headerTop: {
        width: "100%",
        height: "80%",
        // borderWidth: 1,
        flexDirection: "row",
    },
    headerLeft: {
        width: "40%",
        height: "100%",
        // borderWidth: 1,
        justifyContent: "center",
    },
    movieImg: {
        width: "100%",
        height: "95%",
        resizeMode: 'contain'
    },
    headerRight: {
        paddingTop: 5
    },
    title: {
        fontSize: 22,
        fontWeight: "900",
        marginBottom: 5
    },
    score: {
        fontSize: 16,
    },
    commonStyle: {
        fontSize: 14,
        marginTop: 8,
        color: "#555"
    },
    headerBottom: {
        flexDirection: "row",
        justifyContent: 'space-around',
        height: "20%",
        alignItems: "center",
        marginTop: 10
    },
    priceStyle: {
        borderRadius: 25,
        justifyContent: 'center',
        width: 120,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    priceImage: {
        height: 16,
        width: 16
    },
    priceTxt: {
        fontSize: 16,
        textAlign: 'center',
        marginLeft: 10
    },
    movieIntroContainer: {
        width: "100%",
        height: 100,
        // height: "auto",
        // borderWidth: 1,
        marginTop: 15,
        padding: 10,
        marginBottom: 50
    },
    autoHeight: {
        height: "auto",
    },
    movieIntroTxt: {
        color: '#333',
        lineHeight: 22,
        letterSpacing: 1
    },
    selectSeatBtnContainer: {
        width: "100%",
        height: 60,
        // borderWidth: 1,
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    selectSeatBtn: {
        width: 250,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#41bd55",
    },
    selectSeatBtnTxt: {
        textAlign: "center",
        lineHeight: 40,
        fontSize: 16,
        color: "#fff",
        fontWeight: "900",
    }
})