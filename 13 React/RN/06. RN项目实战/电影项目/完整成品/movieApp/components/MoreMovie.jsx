import {
    View,
    FlatList,
    Dimensions,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { queryMoviesApi, randomRefreshMoviesApi } from "../api/Service";
import MovieItemCell from "../components/MovieItemCell";
import LoadingCom from "../components/LoadingCom"
import moviesData from "../api/movies.json";

// 获取屏幕的宽度
export const width = Dimensions.get("window").width;

let currentPage = 1; // 当前页
let pageSize = 10; // 每一页加载多少条
let totalPage = Math.ceil(moviesData.length / pageSize); // 总页数


export default function MoreMovie(props) {

    // 根据 type 值的不同，请求不同的“更多”电影
    const { type, navigation } = props

    // 初始化两个该组件的状态变量
    const [movieList, setMovieList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // 新增一个状态
    // 头部是否刷新
    const [isHeaderRefreshing, setIsHeaderRefreshing] = useState(false);
    const [isFooterRefreshing, setIsFooterRefreshing] = useState(false);

    // 模拟发送请求获取数据
    useEffect(() => {
        if (type === "onshow") {
            currentPage = 1;
        } else {
            currentPage = 10;
        }
        queryMoviesApi(currentPage, pageSize)
            .then((res) => {
                setMovieList(res);
                setLoaded(true);
            })
    }, []);

    // 加载条
    function renderLoad() {
        if (!loaded) {
            return <LoadingCom />
        }
    }

    // 下拉刷新对应的方法
    function beginHeaderRefresh() {
        // 下拉刷新所对应的行为
        // 从服务器去获取新的数据
        // 由于我们没有服务器，所以我们这里做一个模拟，随机返回两条数据
        setIsHeaderRefreshing(true);
        // 模拟刷新了两条
        randomRefreshMoviesApi()
            .then((res) => {
                const newMovie = [...res, ...movieList];
                setMovieList(newMovie);
                setIsHeaderRefreshing(false);
            })
    }

    // 上拉加载对应的方法
    function beginFooterRefresh() {
        setIsFooterRefreshing(true);
        if (currentPage < totalPage) {
            currentPage++;
            queryMoviesApi(currentPage, pageSize)
                .then(res => {
                    const newData = [...movieList, ...res];
                    setMovieList(newData);
                    setIsFooterRefreshing(false);
                })
        }
    }

    // 渲染列表
    function renderList() {
        return (
            <FlatList
                data={movieList}
                renderItem={({ item }) => <MovieItemCell movie={item} onPress={() => {
                    navigation.navigate("MovieDetail", {
                        id: item.id
                    })
                }} />}
                keyExtractor={(item) => item.id + (new Date()).getTime() + Math.floor(Math.random() * 9999 + 1)}
                refreshing={isHeaderRefreshing}
                onRefresh={beginHeaderRefresh}
                onEndReached={beginFooterRefresh}
                onEndReachedThreshold={0.1}
            />
        )
    }

    function renderFooterLoad() {
        if (isFooterRefreshing) {
            return (
                <View style={styles.footerStyle}>
                    <ActivityIndicator size="small" color="#268dcd" />
                    <Text
                        style={{
                            color: "#666",
                            paddingLeft: 10,
                        }}
                    >
                        努力加载中
                    </Text>
                </View>
            )
        }
    }

    return (
        <View style={styles.flex}>
            {/* 渲染加载条 */}
            {renderLoad()}
            {/* 渲染列表 */}
            {renderList()}
            {/* 渲染底部加载条 */}
            {renderFooterLoad()}
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
