import { View, Text, StyleSheet } from "react-native"

export default function TheatreItem(props) {

    const { data } = props

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.theaterName}>{data.theaterName}</Text>
                <Text style={styles.startPrice}>¥<Text style={styles.price}>{data.startPrice}</Text>起</Text>
            </View>
            <View style={styles.addr}>
                <Text style={styles.addrTxt}>{data.theaterAddr}</Text>
            </View>
            <View style={styles.feature}>
                {
                    data.allowRefund ? <Text style={[styles.allowRefund, styles.common]}>可退款</Text> : null
                }
                {
                    data.endorse ? <Text style={[styles.endorse, styles.common]}>折扣卡</Text> : null
                }
                {
                    data.snack ? <Text style={[styles.snack,styles.common]}>小吃</Text> : null
                }
                {
                    data.vipTag ? <Text style={[styles.vipTag,styles.common]}>VIP</Text> : null
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding : 10,
        borderColor: "#bbb",
        marginBottom : 10,
        backgroundColor : "#fff",
        borderRadius : 10
    },
    header: {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems: "center"
    },
    theaterName: {
        fontSize : 18
    },
    startPrice: {
        color : "grey"
    },
    price: {
        color : "rgb(236,93,110)",
        fontSize : 18
    },
    addr: {
        margin: 5,
        marginLeft : 0
    },
    addrTxt : {
        fontSize : 14,
        color : "grey"
    },
    feature: {
        flexDirection : "row",
    },
    common : {
        borderWidth: 1,
        marginRight : 5,
        paddingLeft : 5,
        paddingRight : 5,
        borderRadius : 5,
        marginBottom : 2
    },
    allowRefund: {
        color : "rgb(241,149,62)",
        borderColor: "rgb(241,149,62)"
    },
    endorse: {
        color : "rgb(85,168,239)",
        borderColor: "rgb(85,168,239)"
    },
    snack: {
        color : "rgb(147,183,196)",
        borderColor: "rgb(147,183,196)"
    },
    vipTag: {
        color : "rgb(241,149,62)",
        borderColor: "rgb(241,149,62)"
    }
})