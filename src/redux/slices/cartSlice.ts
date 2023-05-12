import {createSelector, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export interface cartState {
    totalPrice: number,
    items: Pizza[]
}

const initialState: cartState = {
    totalPrice: 0,
    items: []
}
export type Pizza = {
    id: number
    title: string
    imageUrl: string
    types: string
    sizes: number
    price: number
    count: number
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<Pizza>) {
            const findItemId = state.items.find(obj => obj.id === action.payload.id)
            const findItemType = state.items.find(obj => obj.types === action.payload.types)
            const findItemSize = state.items.find(obj => obj.sizes === action.payload.sizes)
            if (findItemId && findItemType && findItemSize) {
                findItemId.count++
            } else {
                state.items.push({...action.payload, count: action.payload.count})
            }
            state.totalPrice += action.payload.price
        },
        removeItem(state, action: PayloadAction<number>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            state.items = state.items.filter(obj => obj.id !== action.payload)
            if (findItem) {
                state.totalPrice = state.totalPrice - findItem.price * findItem.count
            }
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },
        incrementCartItem(state, action: PayloadAction<{ id: number, type: string }>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            const findItemType = state.items.find(obj => obj.types === action.payload.type)

            if (findItem && findItemType) {
                findItem.count++
                state.totalPrice += findItem.price
            }
        },
        decrementCartItem(state, action: PayloadAction<{ id: number }>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                if (findItem.count <= 1) {
                    state.items = state.items.filter(obj => obj.id !== action.payload.id)
                    findItem.count--
                    state.totalPrice -= findItem.price
                    return
                }
                findItem.count--
                state.totalPrice -= findItem.price
            }
        }
    },
})
const selectSelf = (state: RootState) => state
export const selectCart = createSelector(selectSelf, (state: RootState) => state.cart)
export const {addItem, incrementCartItem, decrementCartItem, removeItem, clearItems} = cartSlice.actions
export const cartReducer = cartSlice.reducer