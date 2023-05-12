import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

export interface pizzasState {
    items: PizzasResponse[]
    status: string
}

const initialState: pizzasState = {
    items: [],
    status: 'loading' // loading | success | error
}
type PizzasResponse = {
    id: number
    title: string
    imageUrl: string
    types: number[]
    sizes: number[]
    price: number
    count: number
}

interface FetchPizzasParams {
    category: string;
    search: string;
    order: string;
    sortBy: string;
    currentPage: number;
}

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params: FetchPizzasParams) => {
        const {category, search, order, sortBy, currentPage} = params
        const res = await axios.get<PizzasResponse[]>(`https://64553d0af803f345763e2c11.mockapi.io/items?limit=4&page=${currentPage}&sortBy=${sortBy}${category}&order=${order}${search}`)
        return res.data
    }
)
export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzasItems(state, action: PayloadAction<PizzasResponse[]>) {
            state.items = action.payload
            console.log(state.items)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading'
                state.items = initialState.items
            })
            .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzasResponse[]>) => {
                state.items = action.payload
                state.status = 'success'
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error'
                state.items = initialState.items
            })
    }
})

export const {setPizzasItems} = pizzasSlice.actions
export const pizzaReducer = pizzasSlice.reducer