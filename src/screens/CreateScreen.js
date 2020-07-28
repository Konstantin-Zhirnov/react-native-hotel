import React, { useState, useRef } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    Button,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { useDispatch } from 'react-redux'
import { THEME } from '../theme';
import { addPost } from '../store/actions/post';
import { PhotoPicker } from '../components/PhotoPicker';


export const CreateScreen = ({ navigation }) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const imgRef = useRef()

    const dispatch = useDispatch()

    const saveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            title: title,
            text: text,
            img: imgRef.current,
            booked: false
        }
        dispatch(addPost(post))
        setTitle('')
        setText('')
        navigation.navigate('Main')
    }

    const photoPickHandler = uri => {
        imgRef.current = uri
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Добавить новый номер</Text>
                    <TextInput
                        style={styles.textarea}
                        placeholder="Введите название"
                        value={title}
                        onChangeText={setTitle}
                        multiline
                    />
                    <TextInput
                        style={styles.textarea}
                        placeholder="Введите техт"
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <PhotoPicker onPick={photoPickHandler} />
                    <Button
                        title="Добавить"
                        color={THEME.MAIN_COLOR}
                        onPress={saveHandler}
                        disabled={!text || !title}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-regular',
        marginVertical: 10
    },
    textarea: {
        padding: 10,
        marginBottom: 10
    }
})