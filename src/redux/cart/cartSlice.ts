import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {cartState, Pizza} from "./types";


const {items, totalPrice} = getCartFromLS()
const initialState: cartState = {
    totalPrice,
    items
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<Pizza>) {
            const findItemId = state.items.find((obj) => obj.id === action.payload.id);

            if (findItemId) {
                findItemId.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },
        incrementCartItem(state, action: PayloadAction<{ id: string, type: string }>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)

            if (findItem) {
                findItem.count++
                state.totalPrice += findItem.price
            }
        },
        decrementCartItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload)

            if (findItem) {
                findItem.count--
                state.totalPrice -= findItem.price
            }

            // const findItem = state.items.find(obj => obj.id === action.payload.id)
            // if (findItem) {
            //     if (findItem.count <= 1) {
            //         state.items = state.items.filter(obj => obj.id !== action.payload.id)
            //         findItem.count--
            //         state.totalPrice -= findItem.price
            //         return
            //     }
            //     findItem.count--
            //     state.totalPrice -= findItem.price
            // }
        }
    },
})

export const {addItem, incrementCartItem, decrementCartItem, removeItem, clearItems} = cartSlice.actions
export const cartReducer = cartSlice.reducer