// 搜索页面
import { View, Text, StyleSheet } from "react-native"
import { useState, useEffect, useCallback } from "react"
import { useSelector } from "react-redux"
import { findMovieByTitleApi } from "../api/Service"
import { useFocusEffect } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { updateSearchContent } from "../redux/slice"

// 引入自定义组件
import LabelCom from "../components/LabelCom"
import LoadingCom from "../components/LoadingCom"
import SearchItem from "../components/SearchItem"

export default function SearchScreen({navigation}) {

    // 从仓库获取数据
    const searchHistory = useSelector((state) => state.movie.searchHistory); // 搜索历史数据
    const hotSearchItem = useSelector((state) => state.movie.hotSearchItem); // 热门搜索数据
    const searchContent = useSelector((state) => state.movie.searchContent); // 用户输入的搜索内容


    // 维护一个状态存储搜索结果
    const [searchResult, setSearchResult] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const dispatch = useDispatch();


    useEffect(function () {
        if (searchContent) {
            // 先判断 searchContent 是否有内容
            // 有内容才说明要进行搜索
            // 正常情况下，就应该发送请求进行搜索操作
            setLoaded(false);
            setSearchResult([])
            findMovieByTitleApi(searchContent)
                .then(res => {
                    setSearchResult(res);
                    setLoaded(true);
                })
        }
    }, [searchContent])

    
    useFocusEffect(
        useCallback(()=>{
            // 离开该页面的时候，我们需要做什么事情
            // 清空仓库存储的用户输入的内容
            dispatch(updateSearchContent(""));
        },[])
    )


    return (
        <View style={[styles.container, searchContent.length>0  && loaded === false ? {
            flex : 1,
            justifyContent: 'center',
            alignItems: 'center'
        }:{}]}>
            {
                // 搜索框是否有内容
                searchContent.length > 0 ? (
                    <View>
                        {
                            // 搜索结构是否不为空
                            searchResult.length > 0 ? (
                                <View>
                                    {
                                        searchResult.map(function(item,index){
                                            return <SearchItem item={item} key={index} navigation={navigation}/>
                                        })
                                    }
                                </View>
                            ) : (
                                <View>
                                    {
                                        loaded === false ? <LoadingCom/> : (
                                            <Text style={styles.noContentTxt}>未找到相关内容</Text>
                                        )
                                    }
                                </View>
                            )
                        }
                    </View>
                ) : (
                    <View>
                        {
                            searchHistory.length > 0 ? <LabelCom data={searchHistory} title="历史搜索" /> : null
                        }
                        <LabelCom data={hotSearchItem} title="热门搜索" />
                    </View>
                )
            }
        </View >
    )
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