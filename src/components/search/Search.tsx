import React, {FC} from 'react';
import styles from './search.module.scss'
import searchIcon from '../../assets/img/serach-input.svg'
import closeIcon from '../../assets/img/clear-input.svg'

type SearchPropsType = {
    searchValue: string
    setSearchValue: (value: string) => void
}
const Search: FC<SearchPropsType> = ({searchValue, setSearchValue}) => {

    return (
        <div className={styles.root}>
            <img className={styles.searchIcon} src={searchIcon} alt="search-icon"/>
            <input value={searchValue} onChange={(event) => setSearchValue(event.currentTarget.value)}
                   className={styles.input} type="text"
                   placeholder={'Поиск'}/>
            {searchValue &&
                <img onClick={() => setSearchValue('')} className={styles.clearIcon} src={closeIcon}
                     alt="clear-input"/>
                // <button onClick={() => setSearchValue('')}>X</button>
            }
        </div>

    );
};

export default Search;
