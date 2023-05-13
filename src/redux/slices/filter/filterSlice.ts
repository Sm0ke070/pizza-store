import {createSelector, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../store";


export type SortType = {
    name: string,
    sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price'
}

export interface FilterSliceState {
    searchValue: string
    categoryId: number
    currentPage: number
    pageCount: number
    sort: SortType
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    pageCount: 3,
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
                    name: 'популярности',
                    sortProperty: 'rating'
                }
            }

        }
    },
})

const selectSelf = (state: RootState) => state
export const selectFilter = createSelector(selectSelf, (state: RootState) => state.filter)
export const selectSortProperty = createSelector(selectSelf, (state: RootState) => state.filter.sort)
export const {
    setCategoryId,
    setSearchValue,
    setFilters,
    setCurrentPage,
    setPageCount,
    setSortProperty
} = filterSlice.actions
export const filterReducer = filterSlice.reducer