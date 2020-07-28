import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { Post } from '../components/Post'
import { loadPosts, setIsClick } from '../store/actions/post';
import { THEME } from '../theme';


export const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const openPostHandler = post => {
        navigation.navigate('Post', {
            post: post,
            postId: post.id,
            postTitle: post.title,
            postText: post.text,
            postDate: post.date,
            postBooked: post.booked
        })
        dispatch(setIsClick())
    }

    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])

    const allPosts = useSelector(state => state.post.allPosts)
    const loading = useSelector(state => state.post.loading)

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR} size={24} />
            </View>
        )
    }

    if (allPosts.length === 0) {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.noItem}>Постов пока нет!</Text>
            </View>
        )
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={allPosts}
                keyExtractor={post => post.id.toString()}
                renderItem={({ item }) => <Post post={item} onOpen={openPostHandler} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    noItem: {
        fontFamily: 'open-regular',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 18
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})