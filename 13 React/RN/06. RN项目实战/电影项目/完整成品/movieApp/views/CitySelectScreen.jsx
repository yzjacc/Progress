import { View, Text, StyleSheet, SectionList, ScrollView } from "react-native"
import { findAllCityApi } from "../api/Service"
import { useState, useEffect } from "react"
import LoadingCom from "../components/LoadingCom"

export default function CitySelectScreen() {

    const [cityData, setCityData] = useState([]);
    const [loaded, setLoaded] = useState(false); // 是否显示进度条

    useEffect(function () {
        findAllCityApi()
            .then(res => {
                setCityData(handleData(res))
                if (!loaded) {
                    setLoaded(!loaded)
                }
            })
    }, [])


    function handleData(cityData) {
        return [{
            title: "最近",
            data: cityData.lastVisitCityList
        }, {
            title: "热门",
            data: cityData.hotCityList
        }, {
            title: "A",
            data: cityData.allCityList.filter(c => c.sortLetters === "a" || c.sortLetters === "A")
        }, {
            title: "B",
            data: cityData.allCityList.filter(c => c.sortLetters === "b" || c.sortLetters === "B")
        }, {
            title: "C",
            data: cityData.allCityList.filter(c => c.sortLetters === "c" || c.sortLetters === "C")
        }, {
            title: "D",
            data: cityData.allCityList.filter(c => c.sortLetters === "d" || c.sortLetters === "D")
        }, {
            title: "E",
            data: cityData.allCityList.filter(c => c.sortLetters === "e" || c.sortLetters === "E")
        }, {
            title: "F",
            data: cityData.allCityList.filter(c => c.sortLetters === "f" || c.sortLetters === "F")
        }, {
            title: "G",
            data: cityData.allCityList.filter(c => c.sortLetters === "g" || c.sortLetters === "G")
        }, {
            title: "H",
            data: cityData.allCityList.filter(c => c.sortLetters === "h" || c.sortLetters === "H")
        }, {
            title: "J",
            data: cityData.allCityList.filter(c => c.sortLetters === "j" || c.sortLetters === "J")
        }, {
            title: "K",
            data: cityData.allCityList.filter(c => c.sortLetters === "k" || c.sortLetters === "K")
        }, {
            title: "L",
            data: cityData.allCityList.filter(c => c.sortLetters === "l" || c.sortLetters === "L")
        }];
    }

    function renderSectionHeader({ section }) {
        return (
            <View style={styles.title}>
                <Text style={styles.titleTxt}>{section.title}</Text>
            </View>
        );
    }

    function renderItem({ item }) {
        return (
            <View style={styles.cityItem}>
                <Text style={styles.cityItemTxt}>{item.name}</Text>
            </View>
        );
    }


    return (
        <View style={loaded === false ? {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        } : {}}>
            {
                loaded === false ? <LoadingCom /> : (
                    <SectionList
                        sections={cityData}
                        keyExtractor={(item) => item.id}
                        renderSectionHeader={renderSectionHeader}
                        renderItem={renderItem}
                        stickySectionHeadersEnabled={true}
                    />
                )
            }
        </View>
    );
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