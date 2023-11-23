// 选择城市
import { View, Text, StyleSheet, SectionList} from "react-native"
import { useState, useEffect } from "react"

// 引入自定义组件
import LoadingCom from "../components/LoadingCom"

// 引入 api
import { findAllCityApi} from "../api/Service"

export default function CitySelectScreen(){

    // 维护一个状态存储城市的数据
    const [cityData, setCityData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() =>{
        findAllCityApi()
            .then(res=>{
                setCityData(handleCityData(res),);
                setLoaded(true);
            })
    },[])


    function handleCityData(cityData){
        // 对获取到的数据进行一个二次处理，处理为符合 sectionList 使用要求的数据
        return [
            {title : "最近", data : cityData.lastVisitCityList},
            {title : "热门", data : cityData.hotCityList},
            {title : "A", data : cityData.allCityList.filter(c=>c.sortLetters === 'a' || c.sortLetters === 'A')},
            {title : "B", data : cityData.allCityList.filter(c=>c.sortLetters === 'b' || c.sortLetters === 'B')},
            {title : "C", data : cityData.allCityList.filter(c=>c.sortLetters === 'c' || c.sortLetters === 'C')},
            {title : "D", data : cityData.allCityList.filter(c=>c.sortLetters === 'd' || c.sortLetters === 'D')},
            {title : "E", data : cityData.allCityList.filter(c=>c.sortLetters === 'e' || c.sortLetters === 'E')},
            {title : "F", data : cityData.allCityList.filter(c=>c.sortLetters === 'f' || c.sortLetters === 'F')},
            {title : "G", data : cityData.allCityList.filter(c=>c.sortLetters === 'g' || c.sortLetters === 'G')},
            {title : "H", data : cityData.allCityList.filter(c=>c.sortLetters === 'h' || c.sortLetters === 'H')},
            {title : "J", data : cityData.allCityList.filter(c=>c.sortLetters === 'j' || c.sortLetters === 'J')},
            {title : "K", data : cityData.allCityList.filter(c=>c.sortLetters === 'k' || c.sortLetters === 'K')},
            {title : "L", data : cityData.allCityList.filter(c=>c.sortLetters === 'l' || c.sortLetters === 'L')},
        ]
    }


    // 渲染每一组的标题
    function renderSectionHeader({section}){
        return (
            <View style={styles.title}>
                <Text style={styles.titleTxt}>{section.title}</Text>
            </View>
        )
    }

    // 渲染每一组的具体项目
    function renderItem({item}){
        return (
            <View style={styles.cityItem}>
                <Text style={styles.cityItemTxt}>{item.name}</Text>
            </View>
        )
    }

    return (
        <View style={loaded === false ? {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        } : {}}>
            {
                loaded === false ? <LoadingCom /> : (
                    <SectionList
                        sections={cityData}
                        keyExtractor={(item)=>item.id}
                        renderSectionHeader={renderSectionHeader}
                        renderItem={renderItem}
                        stickySectionHeadersEnabled={true}
                    />
                )
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    },
    title: {
        // borderWidth: 1,
        backgroundColor: "#ddd",
        height: 40,
        paddingLeft: 10
    },
    titleTxt: {
        fontSize: 16,
        lineHeight: 40,
        fontWeight: "900",
    },
    cityItem: {
        // borderWidth: 1,
        height: 35,
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd"
    },
    cityItemTxt: {
        lineHeight: 35
    }
})