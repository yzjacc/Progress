import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react"

// 引入自定义组件
import MovieList from "../components/MovieList"
import LoadingCom from "../components/LoadingCom"

// 引入 api
import {
    recentlyMoviesApi,
    upcomingMoviesApi,
    recommendMoviesApi,
    classicMoviesApi
} from "../api/Service"

export default function HomeScreen({navigation}) {

    // 维护状态来存储电影数据
    const [recentlyMovies, setRecentlyMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [recommendMovies, setRecommendMovies] = useState([]);
    const [classicMovies, setClassicMovies] = useState([]);

    // 加载数据是否已经完成
    const [loaded, setLoaded] = useState(false);


    useEffect(function () {
        // 这里面照理来说就应该发送请求
        recentlyMoviesApi()
            .then(res => {
                setRecentlyMovies(res);
                if(!loaded){
                    setLoaded(true);
                }
            })
    }, [])

    useEffect(function () {
        // 这里面照理来说就应该发送请求
        upcomingMoviesApi()
            .then(res => {
                setUpcomingMovies(res);
                if(!loaded){
                    setLoaded(true);
                }
            })
    }, [])

    useEffect(function () {
        // 这里面照理来说就应该发送请求
        recommendMoviesApi()
            .then(res => {
                setRecommendMovies(res);
                if(!loaded){
                    setLoaded(true);
                }
            })
    }, [])

    useEffect(function () {
        // 这里面照理来说就应该发送请求
        classicMoviesApi()
            .then(res => {
                setClassicMovies(res);
                if(!loaded){
                    setLoaded(true);
                }
            })
    }, [])

    return (
        <View style={loaded === false ? {
            flex : 1,
            justifyContent : 'center',
            alignItems : 'center'
        }:{}}>
            {
                loaded === false ? <LoadingCom /> : (
                    <ScrollView
                        style={styles.container}
                        showsVerticalScrollIndicator={false}
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
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
})
