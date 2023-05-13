import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {filterReducer} from "./slices/filter/filterSlice";
import {cartReducer} from "./slices/cart/cartSlice";
import {pizzaReducer} from "./slices/pizza/pizzaSlice";

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        pizza: pizzaReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => (typeof store.dispatch) = useDispatch