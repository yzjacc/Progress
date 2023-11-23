import {
    View,
    Text,
    Button,
    StyleSheet
} from "react-native"

export default function DetailScreen({navigation}){

    function pressHandle(){
        navigation.navigate("HomeScreen");
    }

    return (
        <View style={styles.container}>
            <Text>这是详情页面</Text>
            <Button title="跳转首页" onPress={pressHandle}/>
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