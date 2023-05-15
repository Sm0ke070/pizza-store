export interface Pizza {
    id: string
    title: string
    imageUrl: string
    type: string
    size: number
    price: number
    count: number
}

export interface cartState {
    totalPrice: number,
    items: Pizza[]
}