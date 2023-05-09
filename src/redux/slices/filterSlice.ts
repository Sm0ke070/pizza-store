import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface filterState {
    categoryId: number
    currentPage: number
    pageCount: number
    sort: {
        name: string,
        sortProperty: string
    }
}

const initialState: filterState = {
    categoryId: 0,
    currentPage: 1,
    pageCount: 0,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSort(state, action: PayloadAction<string>) {
            state.sort.sortProperty = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {setCategoryId, setCurrentPage, setPageCount, setSort} = filterSlice.actions
export const filterReducer = filterSlice.reducer