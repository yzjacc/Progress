import {View,Text, StyleSheet, Pressable,Image, ScrollView} from "react-native";
import MovieListItem from "./MovieListItem"

export default function MovieList(props){

    const {title, movie, navigation} = props;

    return (
        <View style={styles.container}>
            {/* 里面分为上面部分和下面部分 */}
            {/* 上面部分 */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
                <Pressable style={styles.moreBtn}>
                    <Text style={{
                        color:"#41bd55"
                    }}>查看更多</Text>
                    <Image
                        style={styles.arrowGreen}
                        source={require('../assets/ic_arrow_green_right.png')}
                    />
                </Pressable>
            </View>
            {/* 下面部分 */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {
                    movie.map(function(item, index){
                        return index === 0 ? (
                            <MovieListItem key={item.id} data={item} style={{
                                marginLeft: 0 
                            }} navigation={navigation}></MovieListItem>
                        ) : (
                            <MovieListItem key={item.id} data={item} navigation={navigation}></MovieListItem>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30
    },
    header: {
        fontSize: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    headerTitle: {
        color: '#494949',
        fontWeight: '900',
        fontSize: 16
    },
    moreBtn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrowGreen: {
        width: 4,
        height: 5,
        marginLeft: 2
    },
    listWrap: {
        paddingLeft: 15
    }
})