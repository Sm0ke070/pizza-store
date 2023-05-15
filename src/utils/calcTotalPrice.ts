import {Pizza} from "../redux/cart/types";

export const calcTotalPrice = (items: Pizza[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}