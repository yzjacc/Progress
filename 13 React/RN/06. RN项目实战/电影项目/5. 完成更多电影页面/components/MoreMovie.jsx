// 更多电影

import { View, FlatList, Dimensions, Text, StyleSheet, ActivityIndicator } from "react-native"
import { useState, useEffect } from "react"

// 引入自定义组件
import LoadingCom from "./LoadingCom"
import MovieCell from "./MovieCell"

// 引入 api
import { queryMoviesApi, randomRefreshMoviesApi, totalPage } from "../api/Service"

// 获取屏幕的宽度

const { width } = Dimensions.get("window");

let currentPage = 1; // 当前页



export default function MoreMovie(props) {
    const { type, navigation } = props;

    // 组件维护自身的状态
    const [movieList, setMovieList] = useState([]); // 存储电影内容
    const [loaded, setLoaded] = useState(false); // 内容是否加载完毕
    const [headerRefresh, setHeaderRefresh] = useState(false); // 头部是否下拉刷新
    const [footerRefresh, setFooterRefresh] = useState(false); // 底部是否上拉加载

    // 通过 useEffect 来获取数据
    useEffect(function () {
        // 真实开发中，肯定是根据不同的 type 值，请求对应的内容
        // 但是我们这里只是模拟获取不同内容的效果，因此简单的设置一下不同的当前页面数
        // 从而获取到不同的内容
        if (type === "onshow") {
            // 说明是正在热映
            currentPage = 1;
        } else {
            // 说明是即将上映
            currentPage = 10;
        }
        queryMoviesApi(currentPage)
            .then(res => {
                setMovieList(res);
                setLoaded(true);
            })
    }, [])

    function refreshHandle() {
        // 从服务器获取新的数据
        // 更新本地数据
        setHeaderRefresh(true);
        randomRefreshMoviesApi()
            .then(res => {
                const arr = [...res, ...movieList];
                setMovieList(arr);
                setHeaderRefresh(false);
            })
    }

    function endReachHandle() {
        setFooterRefresh(true);
        if (currentPage < totalPage) {
            currentPage++;
            queryMoviesApi(currentPage)
                .then(res => {
                    const arr = [...movieList, ...res];
                    setMovieList(arr);
                    setFooterRefresh(false);
                })
        }
    }

    function renderFooter() {
        if (footerRefresh) {
            return (
                <View style={styles.footerStyle}>
                    <ActivityIndicator size="small" color="#268dcd" />
                    <Text style={{
                        color: "#666",
                        paddingLeft: 10
                    }}>努力加载中</Text>
                </View>
            )
        }
    }

    return (
        <View style={styles.flex}>
            {
                loaded === false ? <LoadingCom /> : (
                    <FlatList
                        data={movieList}
                        keyExtractor={(item) => item.id + (new Date()).getTime() + Math.floor(Math.random() * 9999)}
                        renderItem={({ item }) => (<MovieCell movie={item} onPress={()=>{
                            navigation.navigate("MovieDetail", {
                                id : item.id
                            })
                        }}/>)}
                        // 下拉刷新
                        refreshing={headerRefresh}
                        onRefresh={refreshHandle}
                        // 上拉加载（其实就是以前的分页）
                        onEndReached={endReachHandle}
                        onEndReachedThreshold={0.1}
                    />
                )
            }
            {
                renderFooter()
            }
        </View>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    barStyle: {
        height: 48,
        width: width,
        justifyContent: "center",
        backgroundColor: "#268dcd",
    },
    txtStyle: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
    },
    footerStyle: {
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
});