import {FC, useState} from "react";

const Categories: FC = () => {

    const [activeIndex, setActiveIndex] = useState(0)

    const changeActiveIndex = (index: number) => {
        setActiveIndex(index)
    }
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]

    return (
        <div className="categories">
            <ul>
                {categories.map((value, index) => <li key={index} onClick={() => changeActiveIndex(index)}
                                                      className={activeIndex === index ? 'active' : ''}>{value}</li>)}
            </ul>
        </div>
    )
}

export default Categories;