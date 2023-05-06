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
const Home: FC = () => {
    const [items, setItems] = useState<pizzaType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://64553d0af803f345763e2c11.mockapi.io/items')
            .then(res => res.json())
            .then(res => {
                setItems(res)
                setIsLoading(false)
            })
    }, [])
    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {isLoading
                    ?
                    [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
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
        </>
    );
};

export default Home;
