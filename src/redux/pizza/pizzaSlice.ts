import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {PizzasResponse, PizzasSliceState, Status} from "./types";
import {fetchPizzas} from "./asyncActions";


const initialState: PizzasSliceState = {
    items: [],
    status: Status.LOADING
}


export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzasItems(state, action: PayloadAction<PizzasResponse[]>) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING
                state.items = initialState.items
            })
            .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzasResponse[]>) => {
                state.items = action.payload
                state.status = Status.SUCCESS
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR
                state.items = initialState.items
            })
    }
})

export const {setPizzasItems} = pizzasSlice.actions
export const pizzaReducer = pizzasSlice.reducer