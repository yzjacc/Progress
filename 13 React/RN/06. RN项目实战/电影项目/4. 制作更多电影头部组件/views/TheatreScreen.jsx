// 影院

import { View, Text, StyleSheet } from "react-native"

export default function TheatreScreen() {
    return (
        <View style={styles.container}>
            <Text>影院</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})