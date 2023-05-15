import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {filterReducer} from "./filter/filterSlice";
import {cartReducer} from "./cart/cartSlice";
import {pizzaReducer} from "./pizza/pizzaSlice";

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        pizza: pizzaReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => (AppDispatch) = useDispatch