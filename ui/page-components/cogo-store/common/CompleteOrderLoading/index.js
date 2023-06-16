import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CompleteOrderLoading() {
    return (
        <div className={styles.container}>
            <div className={styles.load}>
                {[1, 2, 3, 4, 5, 6].map((ele) => (
                    <div key={ele} className={styles.wrapper}>
                        <Placeholder width="100%" height="100px" />
                    </div>
                ))}
            </div>
            <div className={styles.wrapper}>
                <Placeholder width="100%" height="300px" />
            </div>
        </div>
    );
}
export default CompleteOrderLoading;
