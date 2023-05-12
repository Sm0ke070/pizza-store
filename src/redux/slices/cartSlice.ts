import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

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
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({...action.payload, count: 1})
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
        incrementItem(state, action: PayloadAction<{ id: number, price: number }>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            }
            state.totalPrice += action.payload.price
        },
        decrementCartItem(state, action: PayloadAction<{ id: number, price: number }>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                if (findItem.count <= 1) {
                    state.items = state.items.filter(obj => obj.id !== action.payload.id)
                    findItem.count--
                    state.totalPrice -= action.payload.price
                    return
                }
                findItem.count--
                state.totalPrice -= action.payload.price
            }
        }
    },
})

export const {addItem, incrementItem, decrementCartItem, removeItem, clearItems} = cartSlice.actions
export const cartReducer = cartSlice.reducer