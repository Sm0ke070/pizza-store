import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {Pizza} from "../redux/slices/cart/cartSlice";


const FullPizza: FC = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [pizza, setPizza] = useState<Pizza>()

    useEffect(() => {
        (async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://64553d0af803f345763e2c11.mockapi.io/items/${id}`)
                setPizza(data)
            } catch (err) {
                alert('Ошибка при получении пиццы!')
                navigate('/')
            }
        }())
    }, [])

    if (!pizza) {
        return <h1>Загрузка...</h1>
    }

    return (
        <>
            <div className='container'>
                <img src={pizza.imageUrl} style={{width: '250px'}} alt="pizza"/>
                <h2>{pizza.title}</h2>
                <h4>{pizza.price} руб.</h4>
            </div>
        </>
    );
};

export default FullPizza;
