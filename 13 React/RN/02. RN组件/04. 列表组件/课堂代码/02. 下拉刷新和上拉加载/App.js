import {
  View,
  FlatList,
  Dimensions,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { queryMovies, randomRefreshMovies } from "./data/Service";
import MovieItemCell from "./components/MovieItemCell";
import moviesData from "./data/movies.json";

// 获取屏幕的宽度
export const width = Dimensions.get("window").width;

let currentPage = 1; // 当前页
let pageSize = 10; // 每一页加载多少条
let totalPage = Math.ceil(moviesData.length / pageSize); // 总页数


export default function App() {
  const data = queryMovies();
  // 初始化两个该组件的状态变量
  const [movieList, setMovieList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // 新增一个状态
  // 头部是否刷新
  const [isHeaderRefreshing, setIsHeaderRefreshing] = useState(false);
  const [isFooterRefreshing, setIsFooterRefreshing] = useState(false);

  // 模拟发送请求获取数据
  useEffect(() => {
    setTimeout(() => {
      setMovieList(data);
      setLoaded(true);
    }, 1000);
  },[]);


  // 渲染标题
  function renderTitle() {
    return (
      <View style={styles.barStyle}>
        <Text style={styles.txtStyle}>电影列表</Text>
      </View>
    );
  }

  // 加载条
  function renderLoad() {
    if (!loaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#268dcd" />
          <Text
            style={{
              color: "#666",
              paddingLeft: 10,
            }}
          >
            努力加载中
          </Text>
        </View>
      );
    }
  }

  // 下拉刷新对应的方法
  function beginHeaderRefresh(){
    // 下拉刷新所对应的行为
    // 从服务器去获取新的数据
    // 由于我们没有服务器，所以我们这里做一个模拟，随机返回两条数据
    setIsHeaderRefreshing(true);
    // 模拟刷新了两条
    const newMovie = randomRefreshMovies();
    const data = [...newMovie, ...movieList];
    setTimeout(() => {
      setMovieList(data);
      setIsHeaderRefreshing(false);
    }, 1000);
  }

  // 上拉加载对应的方法
  function beginFooterRefresh(){
    setIsFooterRefreshing(true);
    if(currentPage < totalPage){
      currentPage++;
      const newMovie = queryMovies(currentPage, pageSize); // 查询对应页码的新数据
      const data = [...movieList, ...newMovie];
      setTimeout(() => {
        setMovieList(data);
        setIsFooterRefreshing(false);
      }, 1000)
    }
  }

  // 渲染列表
  function renderList() {
    return (
      <FlatList 
        data={movieList}
        renderItem={({ item }) => <MovieItemCell movie={item} onPress={()=>{
          alert("点击的电影名：" + item.title);
        }}/>}
        keyExtractor={(item) => item.id + (new Date()).getTime() + Math.floor(Math.random() * 9999 + 1)}
        refreshing={isHeaderRefreshing}
        onRefresh={beginHeaderRefresh}
        onEndReached={beginFooterRefresh}
        onEndReachedThreshold={0.1}
      />
    )
  }

  function renderFooterLoad(){
    if(isFooterRefreshing){
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
      {/* 渲染标题 */}
      {renderTitle()}
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
    backgroundColor: "#268dcd",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "row",
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
