import {RootState} from "../store";
import {createSelector} from "@reduxjs/toolkit";
import {selectSelf} from "../pizza/selectors";

export const selectCart = createSelector(selectSelf, (state: RootState) => state.cart)