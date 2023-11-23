// 一项一项待办的事项
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { decrement, changeStatus } from "../redux/reducers";

export default function List() {
  // todolistItem 是从仓库拿到的数据
  const todolistItem = useSelector((state) => state.todolist.listItem);
  // 通过 dispatch 方法来派发 action 对象
  const dispatch = useDispatch();

  // 短按，切换已完成和未完成的状态
  function pressHandle(index) {
    dispatch(changeStatus(index));
  }

  // 删除
  function longPressHandle(index) {
    Alert.alert("通知", "你是否要删除此条待办事项？", [
      {
        text: "取消",
        onPress: () => console.log("取消删除"),
        style: "cancel",
      },
      {
        text: "确定删除",
        onPress: () => {
          dispatch(decrement(index));
        },
      },
    ]);
  }

  const items = todolistItem.map((item, index) => {
    return (
      <View style={styles.item} key={index}>
        <Pressable
          onPress={() => pressHandle(index)}
          onLongPress={() => longPressHandle(index)}
        >
          {
            item.isCompleted ? 
            <Text style={styles.complete}>{item.title}</Text> :
            <Text>{item.title}</Text>
          }
        </Pressable>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      {/* <View style={styles.item}>
        <Text>学习 RN</Text>
      </View>
      <View style={styles.item}>
        <Text>喝水</Text>
      </View>
      <View style={styles.item}>
        <Text>休息</Text>
      </View> */}
      {items}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  item: {
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: 300,
  },
  complete: {
    textDecorationLine: "line-through",
  },
});
