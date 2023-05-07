import React, {FC} from 'react';
import ReactPaginate from "react-paginate";
import styles from './pagination.module.scss'

type PaginationPropsType = {
    changePage: (page: number) => void
}
const Pagination: FC<PaginationPropsType> = ({changePage}) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => changePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
