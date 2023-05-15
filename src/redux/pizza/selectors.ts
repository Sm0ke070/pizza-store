import {RootState} from "../store";
import {createSelector} from "@reduxjs/toolkit";

export const selectSelf = (state: RootState) => state
export const selectPizza = createSelector(selectSelf, (state: RootState) => state.pizza)