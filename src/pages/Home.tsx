import React, {FC, useEffect, useRef} from 'react';
import Categories from "../components/categories/Categories";
import SortPopup from "../components/sort/SortPopup";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Pagination from "../components/pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {useNavigate} from "react-router";
import {selectPizza} from "../redux/pizza/selectors";
import {selectFilter, selectSortProperty} from "../redux/filter/selectors";
import {fetchPizzas} from "../redux/pizza/asyncActions";
import axios from "axios";


const Home: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {sort, searchValue, categoryId, currentPage} = useAppSelector(selectFilter)
    const {status, items} = useAppSelector(selectPizza)
    const {sortProperty} = useAppSelector(selectSortProperty)

    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const getPizzas = async () => {
        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        const order = sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortProperty.replace('-', '')

        dispatch(fetchPizzas({category, search, order, sortBy, currentPage}))
    }

    useEffect(() => {
        getPizzas()
    }, [categoryId, currentPage, sort.sortProperty, searchValue])


    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1))
    //
    //         const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
    //         dispatch(
    //             setFilters({
    //                 ...params,
    //                 sort
    //             }))
    //         isSearch.current = true
    //     }
    // }, [])

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //     if (!isSearch.current) {
    //         getPizzas()
    //     }
    //     isSearch.current = false
    // }, [categoryId, sortProperty, searchValue, currentPage])


    const pizzas = items.map(obj => <PizzaBlock
            key={obj.id}
            id={obj.id}
            title={obj.title}
            imageUrl={obj.imageUrl}
            price={obj.price}
            sizes={obj.sizes}
            types={obj.types}
            description={obj.description}
        />
    )

    const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId}/>
                <SortPopup sort={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error'
                ?
                <div className='content__error-info'>
                    <h2>Произошла ошибка😕</h2>
                    <p>К сожалению, не удалось получить пиццы. Повторите попытку позже.</p>
                </div>
                :
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>}
            <Pagination/>
        </div>
    );
};

export default Home;
