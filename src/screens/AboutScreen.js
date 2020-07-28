import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const AboutScreen = ({ }) => {
    return (
        <View style={styles.center}>
            <Text style={styles.text}>Это лучшее приложение на React Native, которое может служить отличным шаблоном для любых разработок.</Text>
            <Text></Text>
            <Text></Text>
            <Text>Версия приложения: <Text style={styles.version}>1.0.0</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    text: {
        fontSize: 18,
        textAlign: "center",
    },
    version: {
        fontFamily: 'open-bold'
    }
})