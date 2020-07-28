import React from 'react';
import { Text, View, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native';
import { THEME } from '../theme';
import { useSelector, useDispatch } from 'react-redux';
import { removePost } from '../store/actions/post';

export const PostScreen = ({ route, navigation }) => {

    const dispatch = useDispatch()

    const postId = route.params?.postId
   
    const post = useSelector(state => state.post.allPosts.find(p => p.id === postId))

    const removeHandler = () => {
        Alert.alert(
            "Удаление поста",
            "Вы точно хотите удалить пост?",
            [
              {
                text: "Отменить",
                style: "cancel"
              },
              { text: "Удалить", style: 'destructive', onPress: () => {
                  navigation.navigate('Main')
                  dispatch(removePost(postId))
              } }
            ],
            { cancelable: false }
          );
    }

    if(!post){
        return null
    }

    return (
        <ScrollView>
            <Image source={{ uri: post.img }} style={styles.image} />
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.text}>{post.text}</Text>
            </View>
            <Button title="Удалить" color={THEME.DANGER_COLOR} onPress={removeHandler} />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 250
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'open-bold',
        textAlign: 'center',
        marginTop: 30
    },
    text: {
        fontFamily: 'open-regular'
    }
})