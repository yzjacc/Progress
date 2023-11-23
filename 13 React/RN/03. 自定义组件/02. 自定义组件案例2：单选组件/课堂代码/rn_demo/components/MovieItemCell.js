import { Pressable, View, Image, Text, StyleSheet } from "react-native";

export default function MovieItemCell(props) {
  const movieInfo = props.movie;
  return (
    <Pressable onPress={props.onPress}>
      {/* 外层的容器 */}
      <View style={styles.container}>
        {/* 左边 */}
        <Image source={{ uri: movieInfo.movieImg }} style={styles.thumbnail} />
        {/* 右边 */}
        <View style={styles.rightContainer}>
          {/* 标题 */}
          <Text style={styles.title}>{movieInfo.title}</Text>
          {/* 上映时间 */}
          <Text style={styles.year}>{movieInfo.year}</Text>
          {/* 评分 */}
          {movieInfo.average !== "0" ? (
            <View style={styles.horizontalView}>
              <Text style={styles.titleTag}>评分</Text>
              <Text style={styles.score}>{movieInfo.average}</Text>
            </View>
          ) : (
            <View style={styles.horizontalView}>
              <Text style={styles.titleTag}>暂无评分</Text>
            </View>
          )}
          {/* 导演 */}
          <View style={styles.horizontalView}>
            <Text style={styles.titleTag}>导演</Text>
            <Text style={styles.name}>{movieInfo.directors}</Text>
          </View>
          {/* 主演 */}
          <View style={styles.horizontalView}>
            <Text style={styles.titleTag}>主演</Text>
            <Text style={styles.name}>{
                movieInfo.casts.length > 13 ?
                movieInfo.casts.slice(0, 13) + "..." : movieInfo.casts
            }</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  thumbnail: {
    width: 110,
    height: 150,
    backgroundColor: "#f0f0f0",
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "left",
  },
  year: {
    textAlign: "left",
    color: "#777777",
    marginTop: 10,
  },
  horizontalView: {
    flexDirection: "row",
    marginTop: 10,
  },
  titleTag: {
    color: "#666666",
  },
  score: {
    color: "#ff8800",
    fontWeight: "bold",
  },
  name: {
    color: "#333333",
    flex: 1,
  },
});
