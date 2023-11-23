// 首页的顶部导航组件

import {View, StyleSheet, Dimensions, Text} from 'react-native'
import AreaCom from "../components/AreaCom"
import SearchCom from "../components/SearchCom"


const {width} = Dimensions.get("window");


export default function HomeBar(props){

    const {navigation} = props

    return (
        <View style={styles.headerStyle}>
            <AreaCom areaName="成都" navigation={navigation}/>
            <SearchCom navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: "#ffffff",
        height: 52,
        width: width,
        paddingHorizontal: 25,
        flexDirection: 'row',
        // borderWidth: 1,
        justifyContent: 'space-between',
        marginTop: 20
    },
});