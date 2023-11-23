import { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  StyleSheet,
  SectionList,
} from "react-native";
import { queryMovies } from "./data/Service";
import MovieItemCell from "./components/MovieItemCell";

// 获取屏幕的宽高
export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

export default function App() {
  // 初始化电影数据
  const displayingMovies = queryMovies(1, 10); // 获取第一个 10 条数据
  const incomingMovies = queryMovies(2, 10); // 获取第二个 10 条数据

  // 初始化电影列表和加载状态
  const [sectionData, setSectionData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSectionData([
        { title: "正在上映", data: displayingMovies },
        { title: "即将上映", data: incomingMovies },
      ]);
      setLoaded(true);
    }, 1000);
  }, []);

  // 渲染标题
  function renderTitle() {
    return (
      <View style={styles.barStyle}>
        <Text style={styles.txtStyle}>电影列表</Text>
      </View>
    );
  }

  // 渲染加载条
  function renderLoad() {
    if (!loaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} size="small" />
          <Text style={{ color: "#666666", paddingLeft: 10 }}>努力加载中</Text>
        </View>
      );
    }
  }


  // 渲染电影列表
  function renderList(){
    return (
      <SectionList
        sections={sectionData}
        renderItem={({ item }) => <MovieItemCell movie={item} onPress={()=>{
          alert("点击的电影为：" + item.title);
        }}/>}
        keyExtractor={(item, index) => index}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={true}
      />
    );
  }
 

  return (
    <View style={styles.flex}>
      {/* 标题区域 */}
      {renderTitle()}
      {/* 加载条 */}
      {renderLoad()}
      {/* 列表区域 */}
      {renderList()}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "row",
  },
  loadingView: {
    flex: 1,
    height: height,
    backgroundColor: "#F5FCFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  barStyle: {
    height: 48,
    width: width,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  txtStyle: {
    color: "#000",
    textAlign: "center",
    fontSize: 18,
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: "#268dcd",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});