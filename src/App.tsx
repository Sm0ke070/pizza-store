import React, {useState} from 'react';

import './scss/app.scss';
import Header from "./components/header/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router";
import Cart from "./pages/Cart";
import {useDispatch} from "react-redux";

export type ContextType = {
    searchValue: string
    setSearchValue: (value: string) => void
}
export const SearchContext = React.createContext<any>('')

function App() {
    const [searchValue, setSearchValue] = useState('')
    const dispatch = useDispatch()


    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path={'/'} element={<Home searchValue={searchValue}/>}/>
                        <Route path={'cart'} element={<Cart/>}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                </div>
            </SearchContext.Provider>

        </div>
    );
}

export default App;
