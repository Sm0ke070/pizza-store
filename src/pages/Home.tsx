import React, {FC, useContext, useEffect, useState} from 'react';

import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Pagination from "../components/pagination/Pagination";
import {ContextType, SearchContext} from "../App";
import useSelector from '@reduxjs/toolkit'
import {useAppSelector} from "../redux/store";
import axios from "axios";


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

    const [items, setItems] = useState<pizzaType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    //const currentPage=UseAppSelector(state => state.)
    const categoryId = useAppSelector(state => state.filter.categoryId)
    const sortType = useAppSelector(state => state.filter.sort.sortProperty)

    console.log('app render')


    const category = categoryId ? `&category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''
    const order = sortType.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.replace('-', '')

    useEffect(() => {
        setIsLoading(true)
        // fetch(`https://64553d0af803f345763e2c11.mockapi.io/items?page=${currentPage}&sortBy=${sortBy}${category}&order=${order}${search}`)
        //     .then(res => res.json())
        //     .then(res => {
        //         setItems(res)
        //         setIsLoading(false)
        //     })
        axios.get(`https://64553d0af803f345763e2c11.mockapi.io/items?page=${currentPage}&sortBy=${sortBy}${category}&order=${order}${search}`)
            .then(res => {
                setItems(res.data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])


    const pizzas = items.map(el => <PizzaBlock
        key={el.id}
        title={el.title}
        image={el.imageUrl}
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

            <h2 className="content__title">Все пиццы({pizzas.length})</h2>
            <div className="content__items">

                {isLoading ? skeletons : pizzas}
                {/*{skeletons}*/}

            </div>
            <Pagination changePage={(page) => setCurrentPage(page)}/>
        </div>
    );
};

export default Home;
