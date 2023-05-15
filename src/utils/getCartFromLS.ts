import {calcTotalPrice} from "./calcTotalPrice";
import {Pizza} from "../redux/cart/types";

export const getCartFromLS = () => {
    const data = localStorage.getItem('react-pizza-cart')
    const items = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrice(items)

    return {
        items: items as Pizza[],
        totalPrice
    }
}