import React, {ChangeEvent, FC, useCallback, useRef, useState} from 'react';
import styles from './search.module.scss';
import searchIcon from '../../assets/img/serach-input.svg';
import closeIcon from '../../assets/img/clear-input.svg';
import debounce from 'lodash.debounce';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {selectFilter, setSearchValue} from "../../redux/slices/filter/filterSlice";

const Search: FC = () => {
    const dispatch = useAppDispatch()
    const {searchValue} = useAppSelector(selectFilter)

    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);
    const onClickClear = () => {
        setValue('')
        dispatch(setSearchValue(''))
        inputRef.current && inputRef.current.focus()
    }
    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
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
