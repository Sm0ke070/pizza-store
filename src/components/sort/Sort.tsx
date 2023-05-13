import React, {FC, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {selectFilter, setSortProperty, SortType} from "../../redux/slices/filter/filterSlice";


export const sortList: SortType[] = [
    {name: 'популярности ▼', sortProperty: 'rating'},
    {name: 'популярности ▲', sortProperty: '-rating'},
    {name: 'цене ▼', sortProperty: 'price'},
    {name: 'цене ▲', sortProperty: '-price'},
    {name: 'алфавиту ▼', sortProperty: 'title'},
    {name: 'алфавиту ▲', sortProperty: '-title'},
]
const Sort: FC = () => {

    const dispatch = useAppDispatch()
    const refPopup = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)

    const {sort} = useAppSelector(selectFilter)

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

export default Sort;