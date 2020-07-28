import * as FileSystem from 'expo-file-system';
import { LOAD_POSTS, TOGGLE_BOOKED, SET_IS_CLICK, REMOVE_POST, ADD_POST } from '../types'
import { DATA } from '../../data'

export const loadPosts = () => {
    return {
            type: LOAD_POSTS,
            payload: DATA
        }
    }

export const toggleBooked = id => {
    return {
        type: TOGGLE_BOOKED,
        payload: id
    }
}

export const setIsClick = () => {
    return {
        type: SET_IS_CLICK
    }
}

export const removePost = id => {    
    return {
        type: REMOVE_POST,
        payload: id
    }
}

export const addPost = post => async dispatch => {
    const fileName = post.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName

    try {
        await FileSystem.moveAsync({
            to: newPath,
            from: post.img
        })
    } catch (e) {
        console.log('Error: ', e)
    }

    const payload = { ...post, img: newPath }
    payload.id = Math.floor(Math.random() * 1000)

    dispatch({
        type: ADD_POST,
        payload
    })
}