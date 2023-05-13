import React, {FC, useCallback} from "react";
import {selectFilter, setCategoryId} from "../../redux/slices/filter/filterSlice";
import {useAppDispatch, useAppSelector} from "../../redux/store";


const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]
const Categories: FC = () => {

    const dispatch = useAppDispatch()
    const {categoryId} = useAppSelector(selectFilter)

    const changeActiveIndex = useCallback((index: number) => {
        dispatch(setCategoryId(index))
    }, []);

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => <li key={i} onClick={() => changeActiveIndex(i)}
                                                         className={categoryId === i ? 'active' : ''}>{categoryName}</li>)}
            </ul>
        </div>
    )
}

export default Categories;