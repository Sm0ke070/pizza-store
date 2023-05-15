import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {selectSelf} from "../pizza/selectors";

export const selectFilter = createSelector(selectSelf, (state: RootState) => state.filter)
export const selectSortProperty = createSelector(selectSelf, (state: RootState) => state.filter.sort)