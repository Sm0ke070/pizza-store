import {FC} from "react";

type CategoriesPropsType = {
    value: number
    changeCategory: (value: number) => void
}
const Categories: FC<CategoriesPropsType> = ({value, changeCategory}) => {
    const changeActiveIndex = (index: number) => {
        changeCategory(index)
    }
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => <li key={index} onClick={() => changeActiveIndex(index)}
                                                             className={value === index ? 'active' : ''}>{categoryName}</li>)}
            </ul>
        </div>
    )
}

export default Categories;