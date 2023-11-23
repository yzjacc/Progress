import { View, Text, Pressable, StyleSheet, Image } from "react-native"

export default function MovieListItem(props) {

    const { data, navigation } = props;

    function pressHandle(id){
        // 具体的跳转工作
        navigation.navigate("MovieDetail",{id});
    }

    return (
       <Pressable style={[styles.container, props.style]} onPress={()=>pressHandle(data.id)}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.movieImage}
                    source={{
                        uri : data.movieImg
                    }}
                />
            </View>
            <View style={styles.titleContainer}>
                {/* 标题 */}
                <View>
                    <Text style={styles.title}>
                        {data.title.length > 6 ? data.title.slice(0,5) + "..." : data.title}
                    </Text>
                </View>
                {/* 评分 */}
                <View style={styles.scoreContainer}>
                    {
                        data.average == 0 ? (
                            <Text style={styles.rate}>暂无评分</Text>
                        ) : (
                            <Text style={styles.rate}>电影评分:<Text style={styles.score}>{data.average}</Text>分</Text>
                        )
                    }
                </View>
            </View>
       </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 185,
        marginLeft: 10
    },
    imageContainer: {
        width: 100,
        height: 140,
    },
    movieImage: {
        width: 100,
        height: 140,
        borderRadius: 5
    },
    titleContainer: {
        textAlign: 'center'
    },
    title: {
        margin: 1,
        marginTop: 5,
        fontWeight: "900"
    },
    scoreContainer: {
        width: "100%",
        height: 20,
        justifyContent: "center",
    },
    rate: {
        fontSize: 12,
        color: 'rgb(224,175,76)',
        alignItems: 'center',
        fontWeight: "900"
    },
    score: {
        fontSize: 14,
        fontWeight: "900",
        fontStyle: "italic"
    }
})