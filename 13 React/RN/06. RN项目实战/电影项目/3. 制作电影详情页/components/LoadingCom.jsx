// Loading 组件

import {View,Text,ActivityIndicator,StyleSheet} from "react-native"

export default function LoadingCom(){
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#268dcd"/>
            <Text style={{
                color : "#666",
                paddingLeft : 10
            }}>努力加载中</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
})