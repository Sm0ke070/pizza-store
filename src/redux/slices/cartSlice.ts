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
    count?: number
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addItem(state, action: PayloadAction<Pizza>) {
        //     state.items.push(action.payload)
        //     state.totalPrice += action.payload.price
        // },
        addItem(state, action: PayloadAction<Pizza>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count && findItem.count++
            } else {
                state.items.push({...action.payload, count: 1})
            }
            state.totalPrice += action.payload.price
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items.filter(obj => obj.id !== action.payload)
        },
        clearItems(state) {
            state.items = []
        }
    },
})

// Action creators are generated for each case reducer function
export const {addItem, removeItem, clearItems} = cartSlice.actions
export const cartReducer = cartSlice.reducer