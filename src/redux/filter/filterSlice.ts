import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {FilterSliceState, sortPropertyEnum, SortType} from "./types";


const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    pageCount: 3,
    sort: {
        name: 'популярности ▼',
        sortProperty: sortPropertyEnum.RATING_DESC
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSortProperty(state, action: PayloadAction<SortType>) {
            state.sort.sortProperty = action.payload.sortProperty
            state.sort.name = action.payload.name
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage)
                state.categoryId = Number(action.payload.categoryId)
                state.sort = action.payload.sort
            } else {
                state.currentPage = 1
                state.categoryId = 0
                state.sort = {
                    name: 'популярности ▼',
                    sortProperty: sortPropertyEnum.RATING_DESC
                }
            }

        }
    },
})


export const {
    setCategoryId,
    setSearchValue,
    setFilters,
    setCurrentPage,
    setPageCount,
    setSortProperty
} = filterSlice.actions
export const filterReducer = filterSlice.reducer