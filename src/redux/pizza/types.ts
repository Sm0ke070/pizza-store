export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface PizzasSliceState {
    items: PizzasResponse[]
    status: Status
}

export type PizzasResponse = {
    id: string
    title: string
    imageUrl: string
    types: number[]
    sizes: number[]
    price: number
    count: number
}

export interface SearchPizzaParams { //type FetchPizzasArgs = Record<string, string>
    category: string;
    search: string;
    order: string;
    sortBy: string;
    currentPage: number;
}