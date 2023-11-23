// 即将上映

// 正在热映

import { View, Text, StyleSheet } from "react-native"

export default function ComingSoonScreen() {
    return (
        <View style={styles.container}>
            <Text>即将上映</Text>
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