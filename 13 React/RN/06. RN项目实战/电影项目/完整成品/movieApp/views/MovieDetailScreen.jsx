import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Pressable } from "react-native"
import { Video } from 'expo-av';
import { useState, useEffect, useRef } from "react";
import { findMovieByIdApi } from "../api/Service"
import LoadingCom from "../components/LoadingCom"

const { height, width } = Dimensions.get("window");

export default function MovieDetailScreen({ route, navigation }) {

    // 首先获取传递过来的 id
    const { id } = route.params;

    // 存储电影的信息
    const [movieInfo, setMovieInfo] = useState({});
    const [loaded, setLoaded] = useState(false); // 是否显示进度条

    // 正常情况下，这里应该将 id 发送给服务器，返回对应 id 的电影
    // const movieInfo = moviesData.filter(item => item.id === id)[0];
    useEffect(function () {
        findMovieByIdApi(id).then(res => {
            setMovieInfo(res);
            setLoaded(!loaded);
        })
    }, [id])

    const [isaAutoHeight, setIsAutoHeight] = useState(false);

    const video = useRef(null);

    function pressHandle() {
        setIsAutoHeight(!isaAutoHeight);
    }

    function goToTheatre() {
        // 跳转的时候停止视频播放
        video.current.stopAsync();
        navigation.push("Theatre");
    }

    return (
        loaded === false ? <LoadingCom /> :
            <View>
                <View style={styles.vdContainer}>
                    <Video
                        ref={video}
                        style={styles.video}
                        source={{
                            uri: movieInfo.vd,
                        }}
                        useNativeControls
                        resizeMode="contain"
                        shouldPlay={true}
                    />
                </View>
                <ScrollView style={styles.container}>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerTop}>
                            {/* 左侧电影海报 */}
                            <View style={styles.headerLeft}>
                                <Image
                                    source={{
                                        uri: movieInfo.movieImg,
                                    }}
                                    style={styles.movieImg}
                                />
                            </View>
                            {/* 右侧电影相关信息 */}
                            <View style={styles.headerRight}>
                                <Text style={styles.title}>
                                    {movieInfo.title.length > 9 ? movieInfo.title.slice(0, 9) + "..." : movieInfo.title}
                                </Text>
                                <Text style={styles.score}>
                                    {movieInfo.average == 0 ? "暂无评分" : movieInfo.average + " 分"}
                                </Text>
                                <Text style={styles.commonStyle}>
                                    上映日期: {movieInfo.year}
                                </Text>
                                <Text style={styles.commonStyle}>
                                    {movieInfo.genres}
                                </Text>
                                <Text style={styles.commonStyle}>
                                    导演: {movieInfo.directors}
                                </Text>
                                <Text style={styles.commonStyle}>
                                    主演: {movieInfo.casts.length > 13 ? movieInfo.casts.slice(0, 13) + "..." : movieInfo.casts}
                                </Text>
                            </View>
                        </View>
                        {/* 下方的两个按钮 */}
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
                    <Pressable style={[styles.movieIntroContainer, isaAutoHeight ? styles.autoHeight : ""]} onPress={pressHandle}>
                        {/* 需要使用正则单独处理 */}
                        <Text style={styles.movieIntroTxt}>{movieInfo.summary.replace(/<p>([^<]*?)<\/p>/gi, '$1')}</Text>
                    </Pressable>
                </ScrollView>
                <View style={styles.selectSeatBtnContainer}>
                    <Pressable style={styles.selectSeatBtn} onPress={goToTheatre}>
                        <Text style={styles.selectSeatBtnTxt}>选座购票</Text>
                    </Pressable>
                </View>
            </View>
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