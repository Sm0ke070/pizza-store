import React, {FC, useContext, useRef} from 'react';
import styles from './search.module.scss'
import searchIcon from '../../assets/img/serach-input.svg'
import closeIcon from '../../assets/img/clear-input.svg'
import {ContextType, SearchContext} from "../../App";


const Search: FC = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const {searchValue, setSearchValue} = useContext<ContextType>(SearchContext)

    const onClickClear = () => {
        setSearchValue('')
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <div className={styles.root}>
            <img className={styles.searchIcon} src={searchIcon} alt="search-icon"/>
            <input ref={inputRef} value={searchValue}
                   onChange={(event) => setSearchValue(event.currentTarget.value)}
                   className={styles.input} type="text"
                   placeholder={'Поиск'}/>
            {searchValue &&
                <img onClick={onClickClear} className={styles.clearIcon} src={closeIcon}
                     alt="clear-input"/>
            }
        </div>

    );
};

export default Search;
