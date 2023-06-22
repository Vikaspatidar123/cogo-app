import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Section({ children = null, border = false, title = '', sub = '', className = '' }) {
	return (
		<div
			className={cl`${border ? `${styles.border} ${styles.container}` : `${styles.container}`}
			 ${styles[className]}`}
		>
			<div className={styles.header}>
				{title && <div className={styles.title}>{title}</div>}
				{sub && <div className={styles.sub}>{sub}</div>}
			</div>
			{children}
		</div>
	);
}

export default Section;
