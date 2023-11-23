import {
  View,
  FlatList,
  Dimensions,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { queryMovies } from "./data/Service";
import MovieItemCell from "./components/MovieItemCell";

// 获取屏幕的宽度
export const width = Dimensions.get("window").width;

export default function App() {
  const data = queryMovies();
  // 初始化两个该组件的状态变量
  const [movieList, setMovieList] = useState([]);
  const [loaded, setLoaded] = useState(false);

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

  // 渲染列表
  function renderList() {
    return (
      <FlatList 
        data={movieList}
        renderItem={({ item }) => <MovieItemCell movie={item} onPress={()=>{
          alert("点击的电影名：" + item.title);
        }}/>}
        keyExtractor={(item) => item.id}
      />
    )
  }

  return (
    <View style={styles.flex}>
      {/* 渲染标题 */}
      {renderTitle()}
      {/* 渲染加载条 */}
      {renderLoad()}
      {/* 渲染列表 */}
      {renderList()}
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
});
