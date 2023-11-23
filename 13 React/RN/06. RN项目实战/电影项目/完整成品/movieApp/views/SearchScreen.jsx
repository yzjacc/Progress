import { View, StyleSheet, Text } from "react-native"
import { useSelector } from "react-redux";
import LabelCom from "../components/LabelCom"
import MovieSearchItem from "../components/MovieSearchItem"
import LoadingCom from "../components/LoadingCom"
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { clearSearchContent } from "../redux/slice"
import { findMovieByTitleApi } from "../api/Service"


export default function SearchScreen({ navigation }) {

    // 从仓库获取数据
    const searchHistory = useSelector((state) => state.movie.searchHistory); // 搜索历史数据
    const hotSearchItem = useSelector((state) => state.movie.hotSearchItem); // 热门搜索数据
    const searchContent = useSelector((state) => state.movie.searchContent); // 用户输入的搜索内容

    // 维护本组件的状态
    const [searchResult, setSearchResult] = useState([]);
    const [loaded, setLoaded] = useState(false); // 是否显示进度条

    useEffect(function () {
        // 这里正常情况下，需要发送请求来获取对应内容的数据
        // 因为我们没有服务器，因此从本地的数据来找
        if (searchContent) {
            setSearchResult([]);
            setLoaded(false);
            findMovieByTitleApi(searchContent).then(res => {
                setSearchResult(res);
                setLoaded(true);
            })
        }
    }, [searchContent])

    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            return () => {
                // 当离开这个页面的时候，我们需要清空仓库中存储的用户输入的存储内容
                dispatch(clearSearchContent());
            };
        }, [])
    );

    return (
        <View style={[styles.container, searchContent.length > 0 && loaded === false ? {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        } : {}]}>
            {
                // 看用户是否有输入内容
                searchContent.length > 0 ?
                    (<View>
                        {
                            searchResult.length > 0 ?
                                <View>
                                    {
                                        searchResult.map(function (item, index) {
                                            return (
                                                <MovieSearchItem
                                                    item={item} key={index} navigation={navigation}
                                                />
                                            );
                                        })
                                    }
                                </View>
                                :
                                <View>
                                    {
                                        loaded === false ? <LoadingCom /> :
                                            <View>
                                                <Text style={styles.noContentTxt}>未找到相关内容</Text>
                                            </View>
                                    }
                                </View>
                        }
                    </View >)
                    :
                    (<View>
                        {/* 历史搜索记录 */}
                        {
                            searchHistory.length > 0 ?
                                <LabelCom
                                    title="历史搜索"
                                    items={searchHistory}
                                /> :
                                <View></View>
                        }
                        {/* 热门搜索 */}
                        <LabelCom
                            title="热门搜索"
                            items={hotSearchItem}
                        />
                    </View>)
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    noContentTxt: {
        textAlign: 'center',
        marginTop: 50
    }
})