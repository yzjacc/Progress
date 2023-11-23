// 区域组件

import { Pressable, Text, StyleSheet, Image } from "react-native";

export default function AreaCom(props) {

    const {areaName, navigation} = props;

    function pressHandle(){
        navigation.navigate("CitySelectScreen")
    }

    return (
        <Pressable style={styles.action} onPress={pressHandle}>
            <Text>{areaName}</Text>
            <Image
                style={styles.cityArrow}
                source={require('../assets/arrow_down.png')}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cityText: {
        fontSize: 16,
        justifyContent: 'center',
    },
    cityArrow: {
        width: 8,
        height: 6,
        marginLeft: 3,
        justifyContent: 'center',
    },

    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})