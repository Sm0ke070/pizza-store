import {FC} from "react";
import {setCategoryId} from "../../redux/slices/filterSlice";
import {useAppDispatch, useAppSelector} from "../../redux/store";


const Categories: FC = () => {

    const dispatch = useAppDispatch()
    const categoryId = useAppSelector(state => state.filter.categoryId)

    const changeActiveIndex = (index: number) => {
        dispatch(setCategoryId(index))
    }
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => <li key={index} onClick={() => changeActiveIndex(index)}
                                                             className={categoryId === index ? 'active' : ''}>{categoryName}</li>)}
            </ul>
        </div>
    )
}

export default Categories;