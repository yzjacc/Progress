// 影院
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native"
import { useState, useEffect } from "react"

// 引入自定义组件
import AreaCom from "../components/AreaCom"
import LoadingCom from "../components/LoadingCom"
import TheatreItem from "../components/TheatreItem"

// 引入 api
import { findAllTheatreApi } from "../api/Service"

// 获取屏幕宽高
const { width, height } = Dimensions.get("window");

export default function TheatreScreen() {

    // 维护组件状态
    const [theatreData, setTheatreData] = useState([]);// 存储影院数据
    const [loaded, setLoaded] = useState(false); // 数据是否加载完成

    useEffect(() => {
        findAllTheatreApi()
            .then(res => {
                setTheatreData(res);
                setLoaded(true);
            })
    }, [])

    return (
        <View style={loaded === false ? {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        } : {}}>
            {/* 上方区域选择部分 */}
            <View style={[
                styles.areaSelectContainer, 
                loaded === false ? {
                    marginTop: 40
                } : {}
            ]}>
                {/* 左边 */}
                <View style={styles.areaLeft}>
                    <AreaCom areaName="全城" />
                    <AreaCom areaName="筛选" />
                </View>
                {/* 右边 */}
                <View style={styles.areaRight}>
                    <AreaCom areaName="综合排序" />
                </View>
            </View>
            {/* 下方的影院列表 */}
            <View style={styles.theatreContainer}>
                {
                    loaded === false ? <LoadingCom /> : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={styles.scrollContainer}
                        >
                            {
                                theatreData.map(function (item, index) {
                                    return <TheatreItem data={item} key={index} />
                                })
                            }
                        </ScrollView>
                    )
                }
            </View>
        </View>
    )
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
    scrollContainer: {
        // 40 为上方区域选的高度
        // 60 为 MoreHeader 的高度
        // 10 为容器的 padding
        // height: height - 40 - 60 - 10
        height: height - 110
    }
})