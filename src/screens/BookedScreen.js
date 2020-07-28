import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux'
import { Post } from '../components/Post'

export const BookedScreen = ({ navigation }) => {

    const openPostHandler = post => {
        navigation.navigate('Post', {
            postId: post.id,
            postTitle: post.title,
            postText: post.text,
            postDate: post.date,
            postBooked: post.booked
        })
    }

    const bookedPosts = useSelector(state => state.post.bookedPosts)

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={bookedPosts}
                keyExtractor={post => post.id.toString()}
                renderItem={({ item }) => <Post post={item} onOpen={openPostHandler} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    }
})