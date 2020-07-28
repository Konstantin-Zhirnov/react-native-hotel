import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';


export const Post = ({ post, onOpen }) => {

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
            <View style={styles.post} >
                <ImageBackground style={styles.image} source={{ uri: post.img }}>
                    <View style={styles.textWrap}>
                        {/* <Text style={styles.title}>{new Date(post.date).toLocaleDateString()}</Text> */}
                        <Text style={styles.title}>{post.title}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 40,
        overflow: "hidden",
        borderRadius: 3,
        shadowOpacity: 1,
        shadowColor: 'gray',
        shadowRadius: 10
    },
    image: {
        width: "100%",
        height: 300
    },
    textWrap: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        alignItems: "center",
        width: "100%"
    },
    title: {
        color: "#fff",
        fontFamily: "open-regular",
        fontSize: 20
    }
})
