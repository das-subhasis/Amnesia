import { UserStateProps } from "../context/userContext"

export interface ActionInterface {
    type: string,
    payload: any
}

const userReducer = (state: UserStateProps, action: ActionInterface) => {
    switch (action.type) {
        case 'SET_USER': {
            return { ...state, ...action.payload }
        }
        case 'SET_WISHLIST': {
            if (state.wishList.find(p => p._id === action.payload._id)) return state
            return { ...state, wishList: [...state.wishList, action.payload] }
        }
        case 'REMOVE_FROM_WISHLIST':
            return { ...state, wishList: state.wishList.filter(p => p._id !== action.payload._id) }
        case 'SET_CART': {
            if (state.wishList.find(p => p._id === action.payload._id)) return state
            return { ...state, wishList: [...state.wishList, action.payload] }
        }
        case 'REMOVE_FROM_CART':
            return { ...state, wishList: state.wishList.filter(p => p._id !== action.payload._id) }
        default:
            return state
    }
}

export default userReducer