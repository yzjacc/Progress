import { View, Text, StyleSheet, Pressable, Dimensions, Image } from "react-native"
import AreaCom from "../components/AreaCom"
const { width } = Dimensions.get('window');


export default function MoreHeader(props) {

    const { type, navigation } = props;

    function goToMovie() {
        navigation.navigate("More")
    }

    function goToTheatre() {
        navigation.navigate("Theatre")
    }

    function searchHandle() {
        // 跳转到搜索页面
        navigation.navigate("SearchScreen");
    }

    return (
        <View style={styles.headerStyle}>
            {/* 左侧选择城市 */}
            <AreaCom areaName="成都" navigation={navigation}/>
            {/* 中间选择电影和影院 */}
            <View style={styles.btnContainer}>
                {/* 电影 */}
                <Pressable style={[
                    styles.btn,
                    type === "moreMovie" ? styles.movieBtnSelected : styles.movieBtn
                ]} onPress={goToMovie}>
                    <Text style={[
                        styles.btnTxt,
                        type === "moreMovie" ? styles.movieBtnTxtSelected : styles.movieBtnTxt
                    ]}>电影</Text>
                </Pressable>
                {/* 影院 */}
                <Pressable style={[
                    styles.btn,
                    type === "theatre" ? styles.theatreBtnSelected : styles.theatreBtn
                ]} onPress={goToTheatre}>
                    <Text style={[
                        styles.btnTxt,
                        type === "theatre" ? styles.theatreTxtSelected : styles.theatreTxt
                    ]}>影院</Text>
                </Pressable>
            </View>
            {/* 右侧放大镜 */}
            <Pressable onPress={searchHandle}>
                <Image style={styles.iconStyle} source={require('../assets/icon_search.png')} />
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
    theatreBtn: {

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
    movieBtn: {

    },
    movieBtnTxt: {
        color: "#41bd55",
    }
});