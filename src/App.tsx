import React, {Suspense} from 'react';
import './scss/app.scss';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router";
import MainLayout from "./components/layouts/MainLayout";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'));

//const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */'./pages/FullPizza'));

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route path={''} element={<Home/>}/>
                <Route path={'cart'} element={<Suspense fallback={<h1>Загрузка...</h1>}><Cart/></Suspense>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;
