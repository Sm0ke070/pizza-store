import React, {useEffect, useState} from 'react';
import './scss/app.scss';
import Header from "./components/header/Header";
import Categories from "./components/categories/Categories";
import Sort from "./components/sort/Sort";
import PizzaBlock from "./components/pizzaBlock/PizzaBlock";


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

function App() {
    const [items, setItems] = useState<pizzaType[]>([])

    useEffect(() => {
        fetch('https://64553d0af803f345763e2c11.mockapi.io/items')
            .then(res => res.json())
            .then(json => setItems(json))
    }, [])


    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {items.map(el => <PizzaBlock key={el.id}
                                                     title={el.title}
                                                     image={el.imageUrl}
                                                     price={el.price}
                                                     sizes={el.sizes}
                                                     types={el.types}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
