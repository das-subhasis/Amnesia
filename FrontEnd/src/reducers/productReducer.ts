
const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WISHLIST':
            return { ...state, wishList: action.payload }
        case 'ADD_TO_WISHLIST':
            if (state.wishList.find(p => p._id === action.payload._id)) return state
            return { ...state, wishList: [...state.wishList, { ...action.payload }] }
        case 'REMOVE_FROM_WISHLIST':
            return { ...state, wishList: state.wishList.filter(p => p._id !== action.payload._id) }
    }
}

export default productReducer