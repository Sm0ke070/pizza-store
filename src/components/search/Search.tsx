import React, {ChangeEvent, FC, useCallback, useContext, useRef, useState} from 'react';
import styles from './search.module.scss';
import searchIcon from '../../assets/img/serach-input.svg';
import closeIcon from '../../assets/img/clear-input.svg';
import {ContextType, SearchContext} from "../../App";
import debounce from 'lodash.debounce';

const Search: FC = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const {searchValue, setSearchValue} = useContext<ContextType>(SearchContext)
    const [value, setValue] = useState('')

    const onClickClear = () => {
        setValue('')
        setSearchValue('')
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }
    const updateSearchValue = useCallback(
        debounce((str: string) => {
            setSearchValue(str)
        }, 700), []
    )
    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
        updateSearchValue(event.currentTarget.value)
    }

    return (
        <div className={styles.root}>
            <img className={styles.searchIcon} src={searchIcon} alt="search-icon"/>
            <input ref={inputRef}
                   value={value}
                   onChange={onChangeInput}
                   className={styles.input} type="text"
                   placeholder={'Поиск'}/>
            {value && searchValue &&
                <img onClick={onClickClear} className={styles.clearIcon} src={closeIcon}
                     alt="clear-input"/>
            }
        </div>

    );
};

export default Search;
