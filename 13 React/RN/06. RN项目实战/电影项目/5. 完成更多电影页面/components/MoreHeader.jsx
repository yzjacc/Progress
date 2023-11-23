// 更多电影的头部组件

import { View, Text, StyleSheet, Pressable, Dimensions, Image } from "react-native";

// 引入自定义组件
import AreaCom from "../components/AreaCom"

// 获取屏幕宽度
const { width } = Dimensions.get("window");

export default function MoreHeader(props) {

    const { type, navigation } = props;

    function goToMovie(){
        navigation.navigate("More");
    }

    function goToTheatre(){
        navigation.navigate("Theatre");
    }


    return (
        <View style={styles.headerStyle}>
            {/* 里面就分为左中右三个部分 */}
            {/* 左边是城市选择区域 */}
            <AreaCom areaName="成都" />
            {/* 中间是选择电影和影院 */}
            <View style={styles.btnContainer}>
                {/* 电影 */}
                {/* 根据是否被选中，挂上不同的样式类 */}
                <Pressable style={[
                    styles.btn, 
                    type === "moreMovie" ? styles.movieBtnSelected : {}
                ]} onPress={goToMovie}>
                    <Text style={[
                        styles.btnTxt,
                        type === "moreMovie" ? styles.movieBtnTxtSelected : styles.movieBtnTxt
                    ]}>电影</Text>
                </Pressable>

                {/* 影院 */}
                <Pressable style={[
                    styles.btn, 
                    type === "theatre" ? styles.theatreBtnSelected : {}
                ]} onPress={goToTheatre}>
                    <Text style={[
                        styles.btnTxt,
                        type === "theatre" ? styles.theatreTxtSelected : styles.theatreTxt
                    ]}>影院</Text>
                </Pressable>
            </View>
            {/* 右边是一个放大镜 */}
            <Pressable>
                <Image
                    style={styles.iconStyle}
                    source={require('../assets/icon_search.png')}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        width: width,
        height: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: 0,
        // borderWidth: 1,
    },
    searchBar: {
        height: 38,
        borderRadius: 3,
    },
    iconStyle: {
        width: 16,
        height: 16,
    },
    btnContainer: {
        width: 140,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#41bd55",
        marginLeft: -25
    },
    btn: {
        width: 70,
        height: 30,
        justifyContent: "center"
    },
    btnTxt: {
        textAlign: 'center',
        fontWeight: '900'
    },
    movieBtnSelected: {
        borderRightWidth: 1,
        borderRightColor: "#41bd55",
        backgroundColor: "#41bd55",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    movieBtnTxtSelected: {
        color: "#fff"
    },
    theatreTxt: {
        color: "#41bd55",
    },
    theatreBtnSelected: {
        backgroundColor: "#41bd55",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    theatreTxtSelected: {
        color: "#fff",
    },
    movieBtnTxt: {
        color: "#41bd55",
    }
});