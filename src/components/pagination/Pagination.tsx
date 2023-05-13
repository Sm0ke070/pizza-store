import React, {FC} from 'react';
import ReactPaginate from "react-paginate";
import styles from './pagination.module.scss'
import {setCurrentPage} from "../../redux/slices/filter/filterSlice";
import {useAppDispatch, useAppSelector} from "../../redux/store";


const Pagination: FC = () => {

    const dispatch = useAppDispatch()
    const pageCount = useAppSelector(state => state.filter.pageCount)
    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
