import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import axios, {AxiosResponse} from "axios";
import {RootState} from "../../store";

export interface PizzasSliceState {
    items: PizzasResponse[]
    status: Status
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

const initialState: PizzasSliceState = {
    items: [],
    status: Status.LOADING
}
type PizzasResponse = {
    id: string
    title: string
    imageUrl: string
    types: number[]
    sizes: number[]
    price: number
    count: number
}


interface SearchPizzaParams { //type FetchPizzasArgs = Record<string, string>
    category: string;
    search: string;
    order: string;
    sortBy: string;
    currentPage: number;
}


export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params: SearchPizzaParams) => {
        const {category, search, order, sortBy, currentPage} = params
        const res = await axios.get<PizzasResponse[], AxiosResponse>(`https://64553d0af803f345763e2c11.mockapi.io/items?limit=4&page=${currentPage}&sortBy=${sortBy}${category}&order=${order}${search}`)
        return res.data

    }
)
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
const selectSelf = (state: RootState) => state
export const selectPizza = createSelector(selectSelf, (state: RootState) => state.pizza)
export const {setPizzasItems} = pizzasSlice.actions
export const pizzaReducer = pizzasSlice.reducer