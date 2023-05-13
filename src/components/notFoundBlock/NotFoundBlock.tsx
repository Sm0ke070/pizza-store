import React, {FC} from 'react';

import styles from './notFoundBlock.module.scss'

const NotFoundBlock: FC = () => {

    return (
        <div className={styles.root}>
            <h1>Ничего не найдено.</h1>
        </div>
    );
};

export default NotFoundBlock;
