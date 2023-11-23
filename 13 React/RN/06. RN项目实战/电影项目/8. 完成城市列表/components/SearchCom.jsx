// 搜索栏

import {Pressable, Text, StyleSheet, Dimensions, Image} from 'react-native'

const {width} = Dimensions.get("window");

export default function SearchCom(props){

    const {navigation} = props

    function pressHandle(){
        navigation.navigate("SearchScreen")
    }

    return (
        <Pressable style={styles.searchBar} onPress={pressHandle}>
            <Image
                style={styles.iconStyle}
                source={require('../assets/icon_search.png')}
            />
            <Text style={styles.searchTxt}>搜索影片、影院、演出、视频、咨询</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        width: width * 0.7,
        height: 38,
        borderRadius: 3,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        alignSelf: 'center',
        paddingLeft: 10,
    },
    iconStyle: {
        width: 18,
        height: 18,
    },
    searchTxt: {
        fontSize: 13,
        color: "#666",
        marginLeft: 5
    },
})