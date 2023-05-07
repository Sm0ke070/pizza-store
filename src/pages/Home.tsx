import React, {FC, useEffect, useState} from 'react';

import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";

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
const Home: FC = () => {
    const [items, setItems] = useState<pizzaType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({name: 'популярности', sortProperty: 'rating'})

    const category = categoryId ? categoryId : ''
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.sortProperty.replace('-', '')

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://64553d0af803f345763e2c11.mockapi.io/items?category=${category}&sortBy=${sortBy}&order=${order} `)
            .then(res => res.json())
            .then(res => {
                setItems(res)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType])
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} changeCategory={(id) => setCategoryId(id)}/>
                <Sort value={sortType} changeSort={(id) => setSortType(id)}/>
            </div>

            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {isLoading
                    ?
                    [...new Array(4)].map((_, i) => <Skeleton key={i}/>)
                    :
                    items.map(el => <PizzaBlock
                        key={el.id}
                        title={el.title}
                        image={el.imageUrl}
                        price={el.price}
                        sizes={el.sizes}
                        types={el.types}
                    />)
                }
            </div>
        </div>
    );
};

export default Home;
