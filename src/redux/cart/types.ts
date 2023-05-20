export interface Pizza {
    id: string
    title: string
    imageUrl: string
    type: string
    size: number
    price: number
    description: string
    count: number
}

export interface cartState {
    totalPrice: number,
    items: Pizza[]
}