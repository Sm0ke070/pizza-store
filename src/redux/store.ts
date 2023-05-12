import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {filterReducer} from "./slices/filterSlice";
import {cartReducer} from "./slices/cartSlice";
import {pizzaReducer} from "./slices/pizzaSlice";

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cartReducer: cartReducer,
        pizza: pizzaReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => (typeof store.dispatch) = useDispatch