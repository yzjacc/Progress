import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  SectionList,
  Button
} from "react-native";

export default function App() {
  // const logo = {
  //   uri: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F31%2F92%2F5810d2ed3fda3_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654851583&t=cebc2481560183caea4c8dca86fa88b6",
  //   width: 64,
  //   height: 64,
  // };

  // FlatList 所用数据
  // const data = [
  //   { key: "Devin" },
  //   { key: "Dan" },
  //   { key: "Dominic" },
  //   { key: "Jackson" },
  //   { key: "James" },
  //   { key: "Joel" },
  //   { key: "John" },
  //   { key: "Jillian" },
  //   { key: "Jimmy" },
  //   { key: "Julie" },
  //   { key: "Devin" },
  //   { key: "Dan" },
  //   { key: "Dominic" },
  //   { key: "Jackson" },
  //   { key: "James" },
  //   { key: "Joel" },
  //   { key: "John" },
  //   { key: "Jillian" },
  //   { key: "Jimmy" },
  //   { key: "Julie" },
  //   { key: "Devin" },
  //   { key: "Dan" },
  //   { key: "Dominic" },
  //   { key: "Jackson" },
  //   { key: "James" },
  //   { key: "Joel" },
  //   { key: "John" },
  //   { key: "Jillian" },
  //   { key: "Jimmy" },
  //   { key: "Julie" },
  // ];

  // SectionList 所用到的数据
  const data = [
    { title: "D", data: ["Devin", "Dan", "Dominic"] },
    {
      title: "J",
      data: ["Jackson", "James", "Jillian", "Jimmy", "Joel", "John", "Julie"],
    },
  ];

  function onPressHandle(){
    fetch("https://cnodejs.org/api/v1/topics")
      .then((res)=>res.json())
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  return (
    // ScrollView
    // <ScrollView>
    //   <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Text style={{ fontSize: 96 }}>If you like</Text>
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Text style={{ fontSize: 96 }}>Scrolling down</Text>
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Text style={{ fontSize: 96 }}>What's the best</Text>
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Text style={{ fontSize: 96 }}>Framework around?</Text>
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Image source={logo} />
    //   <Text style={{ fontSize: 80 }}>React Native</Text>
    // </ScrollView>
    // <FlatList
    //   data={data}
    //   renderItem={({ item }) => {
    //     return <Text style={styles.item}>{item.key}</Text>;
    //   }}
    //   keyExtractor={(item, index) => index}
    // />

    // <SectionList 
    //   sections={data}
    //   renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
    //   renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
    //   keyExtractor={(item, index) => index}
    //   style={styles.list}
    // />

    // 发送网路请求
    <View style={styles.container}>
      <Button title="获取数据" onPress={onPressHandle}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  list: {
    marginTop: 50,
  }
});
