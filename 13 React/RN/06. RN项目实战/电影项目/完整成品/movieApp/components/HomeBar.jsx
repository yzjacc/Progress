import { View, StyleSheet, Dimensions } from "react-native"
import SearchCom from "./SearchCom";
import AreaCom from "./AreaCom";

const { width } = Dimensions.get('window');


export default function SearchBar({navigation}) {

    return (
        <View style={styles.headerStyle}>
            <AreaCom navigation={navigation} areaName="成都"/>
            <SearchCom navigation={navigation}/>
        </View>
    );
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