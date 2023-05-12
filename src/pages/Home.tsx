import React, {FC, useContext, useEffect, useRef, useState} from 'react';

import Categories from "../components/categories/Categories";
import Sort, {sortList} from "../components/sort/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Pagination from "../components/pagination/Pagination";
import {ContextType, SearchContext} from "../App";
import {useAppDispatch, useAppSelector} from "../redux/store";
import axios from "axios";
import {setFilters} from "../redux/slices/filterSlice";
import qs from 'qs'
import {useNavigate} from "react-router";


type pizzaType = {
    id: number;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}
export type SortType = {
    name: string
    sortProperty: string
}
type HomePropsType = {
    searchValue: string
}
const Home: FC<HomePropsType> = () => {
    const {searchValue} = useContext<ContextType>(SearchContext);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [items, setItems] = useState<pizzaType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const sort = useAppSelector(state => state.filter.sort)
    const categoryId = useAppSelector(state => state.filter.categoryId)
    const sortType = useAppSelector(state => state.filter.sort.sortProperty)
    const currentPage = useAppSelector(state => state.filter.currentPage)
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const fetchPizzas = () => {
        setIsLoading(true)

        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.replace('-', '')

        axios.get(`https://64553d0af803f345763e2c11.mockapi.io/items?limit=4&page=${currentPage}&sortBy=${sortBy}${category}&order=${order}${search}`)
            .then(res => {
                setItems(res.data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            }, {addQueryPrefix: true})
            navigate(queryString)
        }
        isMounted.current = true
    }, [categoryId, currentPage, sort.sortProperty])


    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(
                setFilters({
                    ...params,
                    sort
                }))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false
    }, [categoryId, sortType, searchValue, currentPage])


    const pizzas = items.map(el => <PizzaBlock
        key={el.id}
        id={el.id}
        title={el.title}
        imageUrl={el.imageUrl}
        price={el.price}
        sizes={el.sizes}
        types={el.types}
    />)

    const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>

            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {isLoading ? skeletons : pizzas}
                {/*{skeletons}*/}

            </div>
            <Pagination currentPage={currentPage}/>
        </div>
    );
};

export default Home;
