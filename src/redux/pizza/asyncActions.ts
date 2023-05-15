import {createAsyncThunk} from "@reduxjs/toolkit";
import {PizzasResponse, SearchPizzaParams} from "./types";
import axios, {AxiosResponse} from "axios";

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params: SearchPizzaParams) => {
        const {category, search, order, sortBy, currentPage} = params
        const res = await axios.get<PizzasResponse[], AxiosResponse>(`https://64553d0af803f345763e2c11.mockapi.io/items?limit=4&page=${currentPage}&sortBy=${sortBy}${category}&order=${order}${search}`)
        return res.data
    }
)