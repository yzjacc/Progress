import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native"
import AreaCom from "../components/AreaCom"
import { findAllTheatreApi } from "../api/Service"
import { useState, useEffect } from "react"
import LoadingCom from "../components/LoadingCom"
import TheatreItem from "../components/TheatreItem"

const { height, width } = Dimensions.get("window");

export default function TheatreScreen({navigation}) {

    // 存储影院数据
    const [theatreData, setTheatreData] = useState([]);
    // 是否显示进度条
    const [loaded, setLoaded] = useState(false);


    useEffect(function () {
        findAllTheatreApi()
            .then(res => {
                setTheatreData(res);
                if (!loaded) {
                    setLoaded(!loaded)
                }
            })
    }, [])


    return (
        <View style={loaded === false ? {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        } : {}}>
            {/* 上方区域选择 */}
            <View style={[styles.areaSelectContainer, loaded === false ? {
                marginTop: 40
            } : {}]}>
                <View style={styles.areaLeft}>
                    <AreaCom areaName="全城" navigation={navigation}/>
                    <AreaCom areaName="筛选" navigation={navigation}/>
                </View>
                <View style={styles.areaRight}>
                    <AreaCom areaName="综合排序" navigation={navigation}/>
                </View>
            </View>
            {/* 下方的影院 */}
            <View style={styles.theatreContainer}>
                {
                    loaded === false ? <LoadingCom /> :
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={styles.scrollContainer}
                        >
                            {
                                theatreData.map((item, index) => {
                                    return <TheatreItem data={item} key={index} />
                                })
                            }
                        </ScrollView>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    areaSelectContainer: {
        width: "100%",
        height: 40,
        // borderWidth: 1,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    areaLeft: {
        width: "40%",
        height: "100%",
        // borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    areaRight: {
        width: "30%",
        height: "100%",
        // borderWidth: 1,
        justifyContent: "center",
    },
    theatreContainer: {
        padding: 10
    },
    scrollContainer : {
        // 40 为上方区域选的高度
        // 60 为 MoreHeader 的高度
        // 10 为容器的 padding
        // height: height - 40 - 60 - 10
        height: height - 110
    }
})