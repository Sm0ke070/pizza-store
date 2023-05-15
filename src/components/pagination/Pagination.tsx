import React, {FC} from 'react';
import ReactPaginate from "react-paginate";
import styles from './pagination.module.scss'
import {setCurrentPage} from "../../redux/filter/filterSlice";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {selectFilter} from "../../redux/filter/selectors";


const Pagination: FC = () => {

    const dispatch = useAppDispatch()
    const {pageCount, currentPage} = useAppSelector(selectFilter)
    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => onChangePage(event.selected + 1)}
            initialPage={currentPage - 1}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
