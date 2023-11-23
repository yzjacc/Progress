import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput
} from "react-native"
import {useState} from "react"

export default function DetailScreen({navigation, route}){

    const [postContent, setPostContent] = useState("");

    const {id, name, age} = route.params;

    function pressHandle(){
        navigation.navigate({
            name : "HomeScreen",
            params : {
                post : postContent
            },
            merge: true
        });
    }

    function setParamsHandle(){
        navigation.setParams({
            name : "谢杰"
        });
    }

    function setOptionHandle(){
        navigation.setOptions({
            title : "详情页标题2222"
        })
    }

    return (
        <View style={styles.container}>
            <Text>这是详情页面</Text>
            <TextInput
                  multiline
                  placeholder="请输入要传递给上一屏的信息"
                  style={{ height: 200, padding: 10, backgroundColor: 'white' }}
                  value={postContent}
                  onChangeText={setPostContent}
            />
            <Button title="跳转首页" onPress={pressHandle}/>
            <Text>id: {id}</Text>
            <Text>name: {name}</Text>
            <Text>age: {age}</Text>
            <Button title="修改姓名" onPress={setParamsHandle}/>
            <Button title="修改标题" onPress={setOptionHandle}/>
        </View>
    );   
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center"
    }
})