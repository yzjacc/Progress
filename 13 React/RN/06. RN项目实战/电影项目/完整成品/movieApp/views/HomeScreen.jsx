import { StyleSheet, ScrollView, View } from "react-native"
import MovieList from "../components/MovieList"
import LoadingCom from "../components/LoadingCom"
import { useState, useEffect } from "react"
import {
    recentlyMoviesApi,
    upcomingMoviesApi,
    recommendMoviesApi,
    classicMoviesApi
} from "../api/Service"

export default function HomeScreen({ navigation }) {

    // 几个状态用来保存请求到的数据
    const [recentlyMovies, setRecentlyMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [recommendMovies, setRecommendMovies] = useState([]);
    const [classicMovies, setClassicMoviesApi] = useState([]);

    const [loaded, setLoaded] = useState(false); // 是否显示进度条

    useEffect(function () {
        recentlyMoviesApi()
            .then(res => {
                setRecentlyMovies(res);
                if (!loaded) {
                    setLoaded(!loaded)
                }
            })
    }, [])

    useEffect(function () {
        upcomingMoviesApi()
            .then(res => {
                setUpcomingMovies(res);
                if (!loaded) {
                    setLoaded(!loaded)
                }
            })
    }, [])

    useEffect(function () {
        recommendMoviesApi()
            .then(res => {
                setRecommendMovies(res);
                if (!loaded) {
                    setLoaded(!loaded)
                }
            })
    }, [])

    useEffect(function () {
        classicMoviesApi()
            .then(res => {
                setClassicMoviesApi(res);
                if (!loaded) {
                    setLoaded(!loaded)
                }
            })
    }, [])

    return (
        <View style={loaded === false ? {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        } : {}}>
            {
                loaded === false ? <LoadingCom /> : (
                    <ScrollView
                        style={styles.container}
                        showsHorizontalScrollIndicator={false}
                    >
                        <MovieList
                            title="近期上映"
                            movie={recentlyMovies}
                            navigation={navigation}
                        />
                        <MovieList
                            title="即将上映"
                            movie={upcomingMovies}
                            navigation={navigation}
                        />
                        <MovieList
                            title="推荐电影"
                            movie={recommendMovies}
                            navigation={navigation}
                        />
                        <MovieList
                            title="经典电影"
                            movie={classicMovies}
                            navigation={navigation}
                        />
                    </ScrollView>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
})