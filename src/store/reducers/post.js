import { LOAD_POSTS, TOGGLE_BOOKED, SET_IS_CLICK, REMOVE_POST, ADD_POST } from '../types'

const initialState = {
    allPosts: [],
    bookedPosts: [],
    loading: true,
    isClick: 1
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS: return {
            ...state,
            allPosts: action.payload,
            bookedPosts: action.payload.filter(post => post.booked),
            loading: false
        }
        case REMOVE_POST: return {
            ...state,
            allPosts: state.allPosts.filter(p => p.id !== action.payload),
            bookedPosts: state.bookedPosts.filter(p => p.id !== action.payload)
        }
        case SET_IS_CLICK: return {
            ...state,
            isClick: state.isClick + 1
        }
        case TOGGLE_BOOKED:
            const allPosts = state.allPosts.map(post => {
                if (post.id === action.payload) {
                    post.booked = !post.booked
                }
                return post
            })
            return {
                ...state,
                allPosts,
                bookedPosts: allPosts.filter(post => post.booked)
            }
        case ADD_POST: return {
            ...state,
            allPosts: [{...action.payload}, ...state.allPosts]
        }
        default: return state
    }
}