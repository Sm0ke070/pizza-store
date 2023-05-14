import React, {FC, useRef, useState} from "react";
import {useAppDispatch} from "../../redux/store";
import {setSortProperty, sortPropertyEnum, SortType} from "../../redux/slices/filter/filterSlice";


export const sortList: SortType[] = [
    {name: 'популярности ▼', sortProperty: sortPropertyEnum.RATING_DESC},
    {name: 'популярности ▲', sortProperty: sortPropertyEnum.RATING_ASC},
    {name: 'цене ▼', sortProperty: sortPropertyEnum.PRICE_DESC},
    {name: 'цене ▲', sortProperty: sortPropertyEnum.PRICE_ASC},
    {name: 'алфавиту ▼', sortProperty: sortPropertyEnum.TITLE_DESC},
    {name: 'алфавиту ▲', sortProperty: sortPropertyEnum.TITLE_ASC},
]
type SortPopupPropsType = {
    sort: SortType
}
const SortPopup: FC<SortPopupPropsType> = ({sort}) => {

    const dispatch = useAppDispatch()
    const refPopup = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)

    const closePopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target !== refPopup.current) {
            setOpen(false)
        }
    }

    const onClickSortBy = (sort: SortType) => {
        dispatch(setSortProperty(sort))
        setOpen(false)
    }
    return (
        <div className="sort">
            <div className="sort__label">
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{sort.name}</span>
            </div>
            {open &&
                <div className="sort__popup" onMouseLeave={(event) => closePopup(event)} ref={refPopup}>
                    <ul>
                        {sortList.map((obj, i) => <li key={i} onClick={() => onClickSortBy(obj)}
                                                      className={sort.sortProperty === obj.sortProperty ? 'active' : ''}> {obj.name} </li>)}
                    </ul>
                </div>}
        </div>
    )
}

export default SortPopup;