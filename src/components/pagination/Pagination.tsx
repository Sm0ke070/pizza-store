import React, {FC} from 'react';
import ReactPaginate from "react-paginate";
import styles from './pagination.module.scss'
import {setCategoryId} from "../../redux/slices/filterSlice";
import {useAppDispatch} from "../../redux/store";

type PaginationPropsType = {
    changePage: (page: number) => void
}
const Pagination: FC<PaginationPropsType> = ({changePage}) => {
    const dispatch = useAppDispatch()
    const onChangePage = (page: number) => {
        dispatch(setCategoryId(page))
    }

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
