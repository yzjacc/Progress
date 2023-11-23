import { StyleSheet, Text, View, Pressable, ScrollView, Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux"
import { clearHistory } from "../redux/slice"

export default function HistoryScreen() {

  const historyArr = useSelector((state) => state.translate.history);

  const dispatch = useDispatch();

  function pressHandle() {
    Alert.alert(
      "通知",
      "是否要清除所有的历史记录？",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "确定", onPress: () => dispatch(clearHistory()) }
      ]
    );
  }


  return (
    <View style={styles.container}>
      {/* 上面的标题部分 */}
      <View style={styles.header}>
        <Text style={styles.font16}>翻译历史</Text>
        <Pressable style={styles.clearBtn} onPress={pressHandle}>
          <Text>清除历史记录</Text>
          <AntDesign name="closecircleo" size={14} color="black" />
        </Pressable>
      </View>
      {/* 下面就是所有的翻译记录 */}
      <ScrollView>
        {
          historyArr.map(function (item, index) {
            return (
              <View style={styles.item} key={index}>
                <View>
                  <Text style={[styles.txt, styles.font16]}>{item.txt}</Text>
                </View>
                <View>
                  <Text>{item.res}</Text>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120
  },
  item: {
    marginTop: 15
  },
  txt: {
    color: "#888",
    marginBottom: 5
  },
  font16: {
    fontSize: 16
  }
});