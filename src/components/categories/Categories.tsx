import React, {FC, useCallback} from "react";
import {setCategoryId} from "../../redux/slices/filter/filterSlice";
import {useAppDispatch} from "../../redux/store";


const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]
type CategoriesPropsType = {
    categoryId: number
}
const Categories: FC<CategoriesPropsType> = ({categoryId}) => {

    const dispatch = useAppDispatch()

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