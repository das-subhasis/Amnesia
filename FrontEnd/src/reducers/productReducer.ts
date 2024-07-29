import { ProductInterface, ProductReducerProps } from "../context/userContext"
import { ActionInterface } from "./userReducer"

const productReducer = (state: ProductReducerProps, action: ActionInterface) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: [...action.payload] }
        case 'REMOVE_PRODUCT':
            const newProductList = state.products.filter(p => p._id !== action.payload)
            return { ...state, products: newProductList }
        case 'SORT_BY_PRICE':
            return { ...state, products: action.payload.sort((a: ProductInterface, b: ProductInterface) => a.price - b.price) }
        default:
            return state
    }
}

export default productReducer