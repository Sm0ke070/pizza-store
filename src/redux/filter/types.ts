export enum sortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',

}

export type SortType = {
    name: string,
    sortProperty: sortPropertyEnum
}

export interface FilterSliceState {
    searchValue: string
    categoryId: number
    currentPage: number
    pageCount: number
    sort: SortType
}