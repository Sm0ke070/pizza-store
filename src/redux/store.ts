import {configureStore} from '@reduxjs/toolkit'
import {filterReducer} from "./slices/filterSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        filter: filterReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => (typeof store.dispatch) = useDispatch